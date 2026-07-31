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

import com.senai.filmes.entities.Genero;
import com.senai.filmes.services.GeneroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/generos")
@CrossOrigin(origins = "*")
public class GeneroController {

    @Autowired
    private GeneroService service;

    @GetMapping
    public List<Genero> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Genero buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Genero salvar(@RequestBody @Valid Genero genero) {
        return service.salvar(genero);
    }

    @PutMapping("/{id}")
    public Genero atualizar(@PathVariable Long id, @RequestBody @Valid Genero dados) {
        return service.atualizar(id, dados);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}