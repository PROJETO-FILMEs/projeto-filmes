package com.senai.filmes.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.filmes.entities.Filme;
import com.senai.filmes.repositories.FilmeRepository;

@Service
public class FilmeService {

    @Autowired
    private FilmeRepository repository;

    public List<Filme> listar() {
        return repository.findAll();
    }

    public Filme buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Filme salvar(Filme filme) {
        return repository.save(filme);
    }

    public Filme atualizar(Long id, Filme dados) {

        Filme filme = repository.findById(id).orElse(null);

        if (filme == null) {
            return null;
        }

        filme.setTitulo(dados.getTitulo());
        filme.setAnoLancamento(dados.getAnoLancamento());
        filme.setDiretor(dados.getDiretor());
        filme.setGenero(dados.getGenero());
        filme.setEstudio(dados.getEstudio());
        filme.setUrlCapa(dados.getUrlCapa());

        return repository.save(filme);
    }

    public void excluir(Long id) {

        Filme filme = repository.findById(id).orElse(null);

        if (filme != null) {
            repository.delete(filme);
        }
    }
}