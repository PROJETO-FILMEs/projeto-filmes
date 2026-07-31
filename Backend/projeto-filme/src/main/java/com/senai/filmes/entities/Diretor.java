package com.senai.filmes.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
	@Table(name = "tb_diretor")
		public class Diretor {
		
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message="O nome do diretor é obrigatório.")
    @Column(nullable = false)
    private String nomeDiretor;
    
    @Column(nullable = false, length = 20)
    @NotBlank(message="A nacionalidade do diretor é obrigatória.")
    
    private String nacionalidade;
    
    @NotNull(message = "A data de nascimento é obrigatória.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento; 
    
    public Diretor() {
    }

    public Diretor(Long id, String nomeDiretor, String nacionalidade,LocalDate dataNascimento) {
        this.id = id;
        this.nomeDiretor = nomeDiretor;
        this.nacionalidade = nacionalidade;
        this.dataNascimento = dataNascimento;
        
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeDiretor() {
		return nomeDiretor;
	}

	public void setNomeDiretor(String nomeDiretor) {
		this.nomeDiretor = nomeDiretor;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

}
