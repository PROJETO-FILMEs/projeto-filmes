package com.senai.filmes.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.filmes.entities.Diretor;
import com.senai.filmes.repositories.DiretorRepository;

@Service
public class DiretorService {

    @Autowired
    private DiretorRepository repository;

    public List<Diretor> listar() {
        return repository.findAll();
    }

    public Diretor buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Diretor salvar(Diretor diretor) {
        return repository.save(diretor);
    }

    public Diretor atualizar(Long id, Diretor dados) {

        Diretor diretor = repository.findById(id).orElse(null);

        if (diretor == null) {
            return null;
        }

        diretor.setNomeDiretor(dados.getNomeDiretor());
        diretor.setNacionalidade(dados.getNacionalidade());
        diretor.setDataNascimento(dados.getDataNascimento());

        return repository.save(diretor);
    }

    public void excluir(Long id) {

        Diretor diretor = repository.findById(id).orElse(null);

        if (diretor != null) {
            repository.delete(diretor);
        }
    }
}