package com.petersen.osystem.repositories;

import com.petersen.osystem.entities.Servico;
import com.petersen.osystem.entities.TipoServico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ServicoRepository extends JpaRepository<Servico, Long> {

    @Query("SELECT obj FROM Servico obj WHERE UPPER(obj.nomeCliente) LIKE UPPER(CONCAT('%', :nomeCliente, '%')) " +
            "AND (:tipoServico IS NULL OR obj.tipoServico = :tipoServico)")
    Page<Servico> searchByName(String nomeCliente, TipoServico tipoServico, Pageable pageable);

    @Query("SELECT obj FROM Servico obj WHERE obj.status = :status " +
            "AND (:tipoServico IS NULL OR obj.tipoServico = :tipoServico)")
    Page<Servico> searchByPayment(Integer status, TipoServico tipoServico, Pageable pageable);
}