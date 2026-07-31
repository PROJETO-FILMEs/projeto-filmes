package com.senai.filmes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.filmes.entities.Estudio;
import com.senai.filmes.services.EstudioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/estudios")
@CrossOrigin(origins = "*")
public class EstudioController {

    @Autowired
    private EstudioService service;

    @GetMapping
    public List<Estudio> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Estudio buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Estudio salvar(@RequestBody @Valid Estudio estudio) {
        return service.salvar(estudio);
    }

    @PutMapping("/{id}")
    public Estudio atualizar(@PathVariable Long id, @RequestBody @Valid Estudio dados) {
        return service.atualizar(id, dados);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}