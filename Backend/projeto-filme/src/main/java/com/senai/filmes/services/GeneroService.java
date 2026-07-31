package com.senai.filmes.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.filmes.entities.Genero;
import com.senai.filmes.repositories.GeneroRepository;

@Service
public class GeneroService {

    @Autowired
    private GeneroRepository repository;

    public List<Genero> listar() {
        return repository.findAll();
    }

    public Genero buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Genero salvar(Genero genero) {
        return repository.save(genero);
    }

    public Genero atualizar(Long id, Genero dados) {

        Genero genero = repository.findById(id).orElse(null);

        if (genero == null) {
            return null;
        }

        genero.setNome(dados.getNome());

        return repository.save(genero);
    }

    public void excluir(Long id) {

        Genero genero = repository.findById(id).orElse(null);

        if (genero != null) {
            repository.delete(genero);
        }
    }
}