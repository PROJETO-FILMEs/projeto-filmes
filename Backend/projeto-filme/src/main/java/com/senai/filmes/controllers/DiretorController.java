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

import com.senai.filmes.entities.Diretor;
import com.senai.filmes.services.DiretorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/diretores")
@CrossOrigin(origins = "*")
public class DiretorController {

    @Autowired
    private DiretorService service;

    @GetMapping
    public List<Diretor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Diretor buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Diretor salvar(@RequestBody @Valid Diretor diretor) {
        return service.salvar(diretor);
    }

    @PutMapping("/{id}")
    public Diretor atualizar(@PathVariable Long id, @RequestBody @Valid Diretor dados) {
        return service.atualizar(id, dados);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}