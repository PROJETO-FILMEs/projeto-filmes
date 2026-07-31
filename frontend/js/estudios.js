document.addEventListener('DOMContentLoaded', () => {
    /* ====================================================================
       1. CONFIGURAÇÕES DA API (Substitua pela URL do seu Back-end)
       ==================================================================== */
    const API_URL = 'http://localhost:8080/api/filmes'; // Exemplo de URL
    
    // Variável para controlar se estamos criando ou editando um estúdio
    let estudioIdEmEdicao = null; 

    /* ====================================================================
       2. SELEÇÃO DE ELEMENTOS DO DOM
       ==================================================================== */
    const modal = document.getElementById('modal-estudio');
    const btnNovoEstudio = document.getElementById('btn-novo-estudio');
    const spanClose = document.getElementById('close-modal');
    const btnCancelar = document.getElementById('btn-cancelar');
    const formEstudio = document.getElementById('form-estudio');
    const modalTitle = document.getElementById('modal-title');
    const tabelaEstudios = document.getElementById('admin-studio-list');

    // Inputs do formulário
    const inputNome = document.getElementById('nome');
    const inputFundador = document.getElementById('fundador');
    const inputAnoFundador = document.getElementById('anoFundador');

    /* ====================================================================
       3. FUNÇÕES DO MODAL (Abrir, Fechar, Mudar Estado)
       ==================================================================== */
    
    // Função para abrir o modal
    function abrirModal(modo = 'cadastrar', estudio = null) {
        modal.style.display = "flex";

        if (modo === 'editar' && estudio) {
            modalTitle.textContent = "Editar Estúdio";
            estudioIdEmEdicao = estudio.id; // Salva o ID para o momento de salvar
            
            // Preenche os campos com os dados vindos do back-end
            inputNome.value = estudio.nome;
            inputFundador.value = estudio.fundador;
            inputAnoFundador.value = estudio.anoFundador;
        } else {
            modalTitle.textContent = "Cadastrar Novo Estúdio";
            estudioIdEmEdicao = null;
            formEstudio.reset();
        }
    }

    // Função para fechar o modal
    function fecharModal() {
        modal.style.display = "none";
        formEstudio.reset();
        estudioIdEmEdicao = null;
    }

    // Eventos do Modal
    btnNovoEstudio.addEventListener('click', () => abrirModal('cadastrar'));
    spanClose.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);

    // Fechar ao clicar fora da janela
    window.addEventListener('click', (event) => {
        if (event.target === modal) fecharModal();
    });


    /* ====================================================================
       4. INTEGRAÇÃO COM O BACK-END (CRUD)
       ==================================================================== */

    // [ READ ] Buscar todos os estúdios
    async function carregarEstudios() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Erro ao buscar estúdios');
            
            const estudios = await response.json();
            renderizarTabela(estudios);
        } catch (error) {
            console.error("Erro na comunicação com a API:", error);
            // Mensagem de fallback caso o back-end esteja desligado
            tabelaEstudios.innerHTML = `<tr><td colspan="4" class="text-center">Não foi possível carregar os estúdios. Verifique se a API está rodando.</td></tr>`;
        }
    }

    // Renderizar dados na tabela
    function renderizarTabela(estudios) {
        tabelaEstudios.innerHTML = ''; // Limpa a tabela
        
        estudios.forEach(estudio => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${estudio.nome}</td>
                <td>${estudio.fundador}</td>
                <td>${estudio.anoFundador}</td>
                <td class="action-cells">
                    <button class="btn-icon edit-btn" onclick="prepararEdicao(${estudio.id})" title="Editar">
                        ✏️
                    </button>
                    <button class="btn-icon delete-btn" onclick="deletarEstudio(${estudio.id})" title="Excluir">
                        🗑️
                    </button>
                </td>
            `;
            tabelaEstudios.appendChild(tr);
        });
    }

    // [ CREATE / UPDATE ] Salvar Formulário
    formEstudio.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Monta o objeto com os dados do form
        const dadosEstudio = {
            nome: inputNome.value,
            fundador: inputFundador.value,
            anoFundador: inputAnoFundador.value
        };

        try {
            if (estudioIdEmEdicao) {
                // Modo: EDIÇÃO (PUT / PATCH)
                const response = await fetch(`${API_URL}/${estudioIdEmEdicao}`, {
                    method: 'PUT', // ou 'PATCH' dependendo da sua API
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosEstudio)
                });

                if (!response.ok) throw new Error('Erro ao atualizar estúdio');
                alert('Estúdio atualizado com sucesso!');

            } else {
                // Modo: CADASTRO (POST)
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosEstudio)
                });

                if (!response.ok) throw new Error('Erro ao cadastrar estúdio');
                alert('Estúdio cadastrado com sucesso!');
            }

            fecharModal();
            carregarEstudios(); // Recarrega a tabela atualizada

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Ocorreu um erro ao salvar. Verifique o console.");
        }
    });

    // [ READ ONE ] Buscar estúdio específico para edição (Exposto globalmente para o onclick)
    window.prepararEdicao = async function(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Erro ao buscar dados do estúdio');
            
            const estudio = await response.json();
            abrirModal('editar', estudio); // Abre o modal preenchido
        } catch (error) {
            console.error("Erro ao buscar estúdio para edição:", error);
            alert("Não foi possível carregar os dados para edição.");
        }
    }

    // [ DELETE ] Excluir Estúdio (Exposto globalmente para o onclick)
    window.deletarEstudio = async function(id) {
        const confirmar = confirm("Tem certeza que deseja excluir este estúdio?");
        if (!confirmar) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erro ao deletar estúdio');
            
            alert('Estúdio removido com sucesso!');
            carregarEstudios(); // Atualiza a tabela

        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Não foi possível excluir o estúdio.");
        }
    }

    /* ====================================================================
       5. INICIALIZAÇÃO
       ==================================================================== */
    // Chama a função para preencher a tabela assim que a página carregar
    carregarEstudios();
});