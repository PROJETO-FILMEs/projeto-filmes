# **Projeto Integrado – Sistema de Catálogo de Filmes Clássicos 🎬**

> **Trabalho acadêmico — Desenvolvimento Full Stack (Frontend + Backend + Banco de Dados + Documentação)**

Este repositório contém todas as etapas, artefatos, códigos e documentações produzidas durante o desenvolvimento do **Sistema de Catálogo de Filmes Clássicos**, seguindo o cronograma de 4 dias de entregas e boas práticas de engenharia de software.

O projeto foi desenvolvido como integrador entre as disciplinas do **2º Semestre do Curso Técnico em Desenvolvimento de Sistemas** no **SENAI Gaspar Ricardo Junior - CFP 402 - Sorocaba/SP**.

**Professor Instrutor:** [Vedilson Prado](https://github.com/vedilsonprado)[cite: 2]

---

## 🧑‍💻 **Desenvolvedores**

| Aluno / Dev | Função / Identificação | GitHub |
| :--- | :--- | :--- |
| **Laura Cruz Reis** | Dev 05 | []() |
| **Maria Eduarda Norbutas** | Dev 09 | []() |
| **Thais Gimenez Silva** | Dev 27 | [@thaasilvaa](https://github.com/thaasilvaa) |
| **Thayná Visentin Silva** | Dev 28 | [@devthaynasilva-star](https://github.com/devthaynasilva-star) |


---

## 🛠️ **Tecnologias e Ferramentas**

<p align="left">
  <img src="https://skillicons.dev/icons?i=java,spring,js,html,css,mysql,git,github,vscode,idea,postman,figma" alt="Tecnologias Utilizadas" />
</p>

* **Backend:** Java 17, Spring Boot (Spring Web MVC, Spring Data JPA, Validation)
* **Frontend:** HTML5, CSS3, JavaScript (ES6+ / Fetch API)
* **Banco de Dados:** MySQL (`db_filmes`)
* **Ferramentas & Versionamento:** Git, GitHub, VS Code / IntelliJ IDEA, Postman, Figma

---

## 🗄️ **Estrutura do Banco de Dados (`db_filmes`)**

O banco de dados conta com relacionamentos de chaves estrangeiras para garantir a integridade dos dados[cite: 2]:

```sql
CREATE DATABASE IF NOT EXISTS db_filmes;
USE db_filmes;

-- Tabela Diretor
CREATE TABLE diretor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50),
    data_nascimento DATE
);

-- Tabela Gênero
CREATE TABLE genero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela Estúdio
CREATE TABLE estudio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    pais_origem VARCHAR(50)
);

-- Tabela Filme
CREATE TABLE filme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    ano_lancamento INT NOT NULL,
    duracao_minutos INT NOT NULL,
    sinopse TEXT,
    id_diretor INT NOT NULL,
    id_genero INT NOT NULL,
    id_estudio INT NOT NULL,
    FOREIGN KEY (id_diretor) REFERENCES diretor(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES genero(id) ON DELETE CASCADE,
    FOREIGN KEY (id_estudio) REFERENCES estudio(id) ON DELETE CASCADE
);
