package com.petersen.osystem.services;

import com.petersen.osystem.dto.ServicoDTO;
import com.petersen.osystem.entities.PagamentoStatus;
import com.petersen.osystem.entities.Servico;
import com.petersen.osystem.entities.TipoServico;
import com.petersen.osystem.repositories.ServicoRepository;
import com.petersen.osystem.services.exceptions.DatabaseException;
import com.petersen.osystem.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

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
    public Page<ServicoDTO> findAll(String nomeCliente, TipoServico tipoServico, String orderBy, Pageable pageable) {
        Pageable pageableWithSort = getPageableWithSort(orderBy, pageable);
        Page<Servico> result = servicoRepository.searchByName(nomeCliente, tipoServico, pageableWithSort);
        return result.map(ServicoDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<ServicoDTO> findByPayment(Integer status, TipoServico tipoServico, String orderBy, Pageable pageable) {
        Pageable pageableWithSort = getPageableWithSort(orderBy, pageable);
        Page<Servico> result = servicoRepository.searchByPayment(status, tipoServico, pageableWithSort);
        return result.map(ServicoDTO::new);
    }


    @Transactional
    public ServicoDTO insert(ServicoDTO dto) {
        verificaPagamento(dto);
        Servico entity = new Servico();
        copyDtoToEntity(dto, entity);
        entity = servicoRepository.save(entity);
        return new ServicoDTO(entity);
    }

    @Transactional
    public ServicoDTO update(Long id, ServicoDTO dto) {
        try {
            verificaPagamento(dto);
            Servico entity = servicoRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = servicoRepository.save(entity);
            return new ServicoDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Recurso nao encontrado");
        }
    }

    @Transactional
    public ServicoDTO cancelarServico(Long id, ServicoDTO dto) {
        try {
            dto.setStatus(PagamentoStatus.CANCELADO);
            Servico entity = servicoRepository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = servicoRepository.save(entity);
            return new ServicoDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Recurso nao encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!servicoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recurso não encontrado");
        }
        try {
            servicoRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade referencial");
        }
    }

    private void copyDtoToEntity(ServicoDTO dto, Servico entity) {
        entity.setNomeCliente(dto.getNomeCliente());
        entity.setDataInicio(dto.getDataInicio());
        entity.setDataTermino(dto.getDataTermino());
        entity.setDescricaoServico(dto.getDescricaoServico());
        entity.setValorServico(dto.getValorServico());
        entity.setValorPago(dto.getValorPago());
        entity.setTipoServico(dto.getTipoServico());
        entity.setDataPagamento(dto.getDataPagamento());
        entity.setStatus(dto.getStatus());
    }

    private Pageable getPageableWithSort(String orderBy, Pageable pageable) {
        Sort sort = (orderBy != null && !orderBy.isEmpty())
                ? Sort.by(Sort.Direction.DESC, orderBy)
                : Sort.by(Sort.Direction.ASC, "id");
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
    }

    private void verificaPagamento (ServicoDTO dto) {
        if (dto.getValorPago() == null || dto.getValorPago() == 0) {
            dto.setStatus(PagamentoStatus.PEDENTE);
        } else if (dto.getValorServico().equals(dto.getValorPago())) {
            dto.setStatus(PagamentoStatus.REALIZADO);
            dto.setDataPagamento(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
        } else {
            dto.setStatus(PagamentoStatus.PARCIAL);
        }
    }
}

