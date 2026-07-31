const API = "http://localhost:8080/api/filmes";

let listaFilmes = [];

document.addEventListener("DOMContentLoaded", () => {

    listarFilmes();

    document
        .getElementById("admin-search")
        .addEventListener("input", pesquisarFilme);

    document
        .getElementById("btn-novo-filme")
        .addEventListener("click", () => {

            window.location.href = "cadastro-filme.html";

        });

});

// ==============================
// LISTAR FILMES
// ==============================

async function listarFilmes() {

    try {

        const resposta = await fetch(API);

        listaFilmes = await resposta.json();

        preencherTabela(listaFilmes);

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar os filmes.");

    }

}

// ==============================
// TABELA
// ==============================

function preencherTabela(lista) {

    const tbody = document.getElementById("admin-movie-list");

    tbody.innerHTML = "";

    lista.forEach(filme => {

        tbody.innerHTML += `

        <tr>

            <td>

                <img
                    src="${filme.urlCapa}"
                    class="table-thumb"
                    alt="${filme.titulo}"
                >

            </td>

            <td>${filme.titulo}</td>

            <td>${filme.anoLancamento}</td>

            <td>${filme.diretor.nomeDiretor}</td>

            <td>${filme.estudio.nome}</td>

            <td>${filme.genero.nome}</td>

            <td class="text-center">

                <div class="action-cells">

                    <button
                        class="btn-icon delete-btn"
                        onclick="excluirFilme(${filme.id})">

                        🗑️

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

// ==============================
// PESQUISAR
// ==============================

function pesquisarFilme() {

    const texto = document
        .getElementById("admin-search")
        .value
        .toLowerCase();

    const resultado = listaFilmes.filter(filme =>

        filme.titulo
            .toLowerCase()
            .includes(texto)

    );

    preencherTabela(resultado);

}

// ==============================
// EXCLUIR
// ==============================

async function excluirFilme(id) {

    const confirmar = confirm("Deseja realmente excluir este filme?");

    if (!confirmar) return;

    try {

        const resposta = await fetch(API + "/" + id, {

            method: "DELETE"

        });

        if (resposta.ok) {

            alert("Filme excluído com sucesso!");

            listarFilmes();

        } else {

            alert("Erro ao excluir o filme.");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com a API.");

    }

}