const API = "http://localhost:8080/api/diretores";

let listaDiretores = [];

document.addEventListener("DOMContentLoaded", () => {
    listarDiretores();

    document
        .getElementById("admin-search")
        .addEventListener("input", pesquisarDiretor);

    document
        .getElementById("btn-novo-diretor")
        .addEventListener("click", () => {
            window.location.href = "cadastro-diretor.html";
        });
});

async function listarDiretores() {

    try {

        const resposta = await fetch(API);

        listaDiretores = await resposta.json();

        preencherTabela(listaDiretores);

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar diretores.");

    }

}

function preencherTabela(lista) {

    const tbody = document.getElementById("admin-director-list");

    tbody.innerHTML = "";

    lista.forEach(diretor => {

        tbody.innerHTML += `

        <tr>

            <td>${diretor.nomeDiretor}</td>

            <td>${diretor.nacionalidade}</td>

            <td>${diretor.dataNascimento}</td>

            <td class="text-center">

                <div class="action-cells">

                    <button
                        class="btn-icon delete-btn"
                        onclick="excluirDiretor(${diretor.id})">

                        🗑️

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

function pesquisarDiretor() {

    const texto = document
        .getElementById("admin-search")
        .value
        .toLowerCase();

    const resultado = listaDiretores.filter(diretor =>

        diretor.nomeDiretor
            .toLowerCase()
            .includes(texto)

    );

    preencherTabela(resultado);

}

async function excluirDiretor(id) {

    if (!confirm("Deseja realmente excluir este diretor?")) return;

    try {

        const resposta = await fetch(API + "/" + id, {

            method: "DELETE"

        });

        if (resposta.ok) {

            listarDiretores();

        } else {

            alert("Erro ao excluir.");

        }

    } catch (erro) {

        console.error(erro);

    }

}