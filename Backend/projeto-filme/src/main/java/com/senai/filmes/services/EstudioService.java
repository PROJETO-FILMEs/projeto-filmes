package com.senai.filmes.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.filmes.entities.Estudio;
import com.senai.filmes.repositories.EstudioRepository;

@Service
public class EstudioService {

    @Autowired
    private EstudioRepository repository;

    public List<Estudio> listar() {
        return repository.findAll();
    }

    public Estudio buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Estudio salvar(Estudio estudio) {
        return repository.save(estudio);
    }

    public Estudio atualizar(Long id, Estudio dados) {

        Estudio estudio = repository.findById(id).orElse(null);

        if (estudio == null) {
            return null;
        }

        estudio.setNome(dados.getNome());
        estudio.setFundador(dados.getFundador());
        estudio.setAnoFundacao(dados.getAnoFundacao());

        return repository.save(estudio);
    }

    public void excluir(Long id) {

        Estudio estudio = repository.findById(id).orElse(null);

        if (estudio != null) {
            repository.delete(estudio);
        }
    }
}