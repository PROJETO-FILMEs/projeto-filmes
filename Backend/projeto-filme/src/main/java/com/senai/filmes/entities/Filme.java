package com.senai.filmes.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

	@Entity
	@Table(name = "tb_filmes")
		public class Filme {

		@Id

		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		@NotBlank(message = "O titulo do filme é obrigatório")
		@Column(nullable = false)
		private String titulo;

		@Min(value = 1888, message = "Ano inválido")
		private Integer anoLancamento;

		@ManyToOne
		@JoinColumn(name = "diretor_id", nullable = false)
        private Diretor diretor;
		
		@ManyToOne
		@JoinColumn(name = "estudio_id", nullable = false)
		private Estudio estudio;
		
		@ManyToOne
		@JoinColumn(name = "genero_id", nullable = false)
		private Genero genero;
		
		@Column(name = "url_capa") 
		private String urlCapa;
		

		public Filme() {
		}

		public Filme(Long id, String titulo, Integer anoLancamento, Diretor diretor, Genero genero, Estudio estudio, String urlCapa) {
			this.titulo = titulo;
			this.anoLancamento = anoLancamento;
			this.diretor = diretor;
			this.genero = genero;
			this.urlCapa = urlCapa;
			this.estudio = estudio;
			this.id = id;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTitulo() {
			return titulo;
		}

		public void setTitulo(String titulo) {
			this.titulo = titulo;
		}

		public Integer getAnoLancamento() {
			return anoLancamento;
		}

		public void setAnoLancamento(Integer anoLancamento) {
			this.anoLancamento = anoLancamento;
		}

		public Diretor getDiretor() {
			return diretor;
		}

		public void setDiretor(Diretor diretor) {
			this.diretor = diretor;
		}

		public Estudio getEstudio() {
			return estudio;
		}

		public void setEstudio(Estudio estudio) {
			this.estudio = estudio;
		}

		public Genero getGenero() {
			return genero;
		}

		public void setGenero(Genero genero) {
			this.genero = genero;
		}

		public String getUrlCapa() {
			return urlCapa;
		}

		public void setUrlCapa(String urlCapa) {
			this.urlCapa = urlCapa;
		}
		
		
	}

