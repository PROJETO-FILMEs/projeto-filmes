const API = "http://localhost:8080/api/generos";

let listaGeneros = [];

document.addEventListener("DOMContentLoaded", () => {

    listarGeneros();

    document
        .getElementById("admin-search")
        .addEventListener("input", pesquisarGenero);

    document
        .getElementById("btn-novo-genero")
        .addEventListener("click", () => {

            window.location.href = "cadastro-genero.html";

        });

});

// ===============================
// LISTAR GÊNEROS
// ===============================

async function listarGeneros() {

    try {

        const resposta = await fetch(API);

        listaGeneros = await resposta.json();

        preencherTabela(listaGeneros);

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar os gêneros.");

    }

}

// ===============================
// PREENCHER TABELA
// ===============================

function preencherTabela(lista) {

    const tbody = document.getElementById("admin-genre-list");

    tbody.innerHTML = "";

    lista.forEach(genero => {

        tbody.innerHTML += `

        <tr>

            <td>${genero.nome}</td>

            <td class="text-center">

                <div class="action-cells">

                    <button
                        class="btn-icon delete-btn"
                        onclick="excluirGenero(${genero.id})">

                        🗑️

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

// ===============================
// PESQUISAR
// ===============================

function pesquisarGenero() {

    const texto = document
        .getElementById("admin-search")
        .value
        .toLowerCase();

    const resultado = listaGeneros.filter(genero =>

        genero.nome
            .toLowerCase()
            .includes(texto)

    );

    preencherTabela(resultado);

}

// ===============================
// EXCLUIR
// ===============================

async function excluirGenero(id) {

    const confirmar = confirm("Deseja realmente excluir este gênero?");

    if (!confirmar) return;

    try {

        const resposta = await fetch(API + "/" + id, {

            method: "DELETE"

        });

        if (resposta.ok) {

            alert("Gênero excluído com sucesso!");

            listarGeneros();

        } else {

            alert("Erro ao excluir o gênero.");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com a API.");

    }

}