package com.petersen.osystem.repositories;

import com.petersen.osystem.entities.Servico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.security.Provider;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

    @Query("SELECT obj FROM Servico obj WHERE UPPER(obj.nomeCliente) LIKE UPPER(CONCAT('%', :name, '%'))")
    Page<Servico> searchByName(String nomeCliente, Pageable pageable);
}
