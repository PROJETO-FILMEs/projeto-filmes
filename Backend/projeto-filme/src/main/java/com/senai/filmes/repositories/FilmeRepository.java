package com.senai.filmes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.filmes.entities.Filme;

@Repository
public interface FilmeRepository extends JpaRepository<Filme, Long> {

}
