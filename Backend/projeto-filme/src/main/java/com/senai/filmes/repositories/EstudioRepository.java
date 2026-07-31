package com.senai.filmes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.filmes.entities.Estudio;

@Repository
public interface EstudioRepository extends JpaRepository<Estudio, Long> {

}

