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

import com.senai.filmes.entities.Filme;
import com.senai.filmes.services.FilmeService;

import jakarta.validation.Valid;

@RestController
	@RequestMapping("/api/filmes")
	@CrossOrigin(origins = "*")
		public class FilmeController {

	@Autowired
	private FilmeService service;

	@GetMapping
	public List<Filme> listar() {
		return service.listar();
	}

	@GetMapping("/{id}")
	public Filme buscar(@PathVariable Long id) {
		return service.buscarPorId(id);
	}

	@PostMapping
	public Filme salvar(@RequestBody @Valid Filme filme) {
		return service.salvar(filme);
	}

	@PutMapping("/{id}")
	public Filme atualizar(@PathVariable Long id, @RequestBody @Valid Filme dados) {
		return service.atualizar(id, dados);
	}

	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Long id) {
		service.excluir(id);
	}
}