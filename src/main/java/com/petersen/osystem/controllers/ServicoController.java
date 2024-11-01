package com.petersen.osystem.controllers;

import com.petersen.osystem.dto.ServicoDTO;
import com.petersen.osystem.services.ServicoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/servicos")
public class ServicoController {

    @Autowired
    private ServicoService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ServicoDTO> findById(@PathVariable Long id) {
        ServicoDTO dto = service.findById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<Page<ServicoDTO>> findAll(
        @RequestParam(name = "name", defaultValue = "") String name, Pageable pageable){
        Page<ServicoDTO> dto = service.findAll(name, pageable);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<ServicoDTO> insert(@Valid @RequestBody ServicoDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ServicoDTO> update(@PathVariable Long id, @Valid @RequestBody ServicoDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping
    public ResponseEntity<ServicoDTO> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
