package com.petersen.osystem.services;

import com.petersen.osystem.dto.ServicoDTO;
import com.petersen.osystem.entities.PagamentoStatus;
import com.petersen.osystem.entities.Servico;
import com.petersen.osystem.repositories.ServicoRepository;
import com.petersen.osystem.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    @Transactional(readOnly =  true)
    public ServicoDTO findById(Long id) {
        Servico servico = servicoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Recurso nao encontrado"));
        return new ServicoDTO(servico);
    }

    @Transactional(readOnly = true)
    public Page<ServicoDTO> findAll(String nomeCliente, Pageable pageable) {
        Page<Servico> result = servicoRepository.searchByName(nomeCliente, pageable);
        return result.map(x -> new ServicoDTO(x));
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public Servico insert(ServicoDTO dto) {
        verificaPagamentoInsert(dto);
        Servico entity = new Servico();
        copyDtoToEntity(dto, entity);
        return servicoRepository.saveAndFlush(entity);
    }

    @Transactional
    public Servico update(Servico servico) {
        return servicoRepository.save(servico);
    }

    @Transactional
    public void delete(Long id) {
        Servico servico = servicoRepository.findById(id).get();
        servicoRepository.delete(servico);
    }

    private void copyDtoToEntity(ServicoDTO dto, Servico entity) {
        entity.setNomeCliente(dto.getNomeCliente());
        entity.setDataInicio(dto.getDataInicio());
        entity.setDataTermino(dto.getDataTermino());
        entity.setDescricaoServico(dto.getDescricaoServico());
        entity.setValorServico(dto.getValorServico());
        entity.setValorPago(dto.getValorPago());
        entity.setDataPagamento(dto.getDataPagamento());
        entity.setStatus(dto.getStatus());
    }

    private void verificaPagamentoInsert (ServicoDTO dto) {
        if (dto.getValorPago() == null || dto.getValorPago() == 0 || dto.getDataPagamento() == null) {
            dto.setStatus(PagamentoStatus.PEDENTE);
        } else {
            dto.setStatus(PagamentoStatus.REALIZADO);
        }
    }
}

