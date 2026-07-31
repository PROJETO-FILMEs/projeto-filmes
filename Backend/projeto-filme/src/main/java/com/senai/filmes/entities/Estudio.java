package com.senai.filmes.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_estudios")
public class Estudio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do estúdio é obrigatório.")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "O nome do fundador é obrigatório.")
    @Column(nullable = false)
    private String fundador;

    @NotNull(message = "O ano de fundação é obrigatório.")
    @Min(value = 1888, message = "Ano inválido.")
    private Integer anoFundacao;

    
    public Estudio() {
    }

    public Estudio(Long id, String nome, String fundador,Integer anoFundacao) {
        this.id = id;
        this.nome = nome;
        this.fundador = fundador;
        this.anoFundacao = anoFundacao;
        
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getFundador() {
		return fundador;
	}

	public void setFundador(String fundador) {
		this.fundador = fundador;
	}

	public Integer getAnoFundacao() {
		return anoFundacao;
	}

	public void setAnoFundacao(Integer anoFundacao) {
		this.anoFundacao = anoFundacao;
	}

}