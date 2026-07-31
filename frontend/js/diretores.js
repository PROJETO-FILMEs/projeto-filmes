document.addEventListener('DOMContentLoaded', () => {
   
    const API_URL = 'http://localhost:8080/api/filmes'; 
    
    // Variável para controlar se estamos criando ou editando um diretor
    let diretorIdEmEdicao = null; 

    /* ====================================================================
       2. SELEÇÃO DE ELEMENTOS DO DOM
       ==================================================================== */
    const modal = document.getElementById('modal-diretor');
    const btnNovoDiretor = document.getElementById('btn-novo-diretor');
    const spanClose = document.getElementById('close-modal');
    const btnCancelar = document.getElementById('btn-cancelar');
    const formDiretor = document.getElementById('form-diretor');
    const modalTitle = document.getElementById('modal-title');
    const tabelaDiretores = document.getElementById('admin-director-list');

    // Inputs do formulário
    const inputNome = document.getElementById('nomeDiretor');
    const inputNacionalidade = document.getElementById('nacionalidade');
    const inputDataNascimento = document.getElementById('dataNascimento');

    /* ====================================================================
       3. FUNÇÕES DO MODAL (Abrir, Fechar, Mudar Estado)
       ==================================================================== */
    
    // Função para abrir o modal
    function abrirModal(modo = 'cadastrar', diretor = null) {
        modal.style.display = "flex";

        if (modo === 'editar' && diretor) {
            modalTitle.textContent = "Editar Diretor";
            diretorIdEmEdicao = diretor.id; // Salva o ID para o momento de salvar
            
            // Preenche os campos com os dados vindos do back-end
            // Nota: Se a sua API retornar 'nome' ao invés de 'nomeDiretor', ajuste aqui.
            inputNome.value = diretor.nomeDiretor || diretor.nome; 
            inputNacionalidade.value = diretor.nacionalidade;
            
            // O input type="date" exige o formato AAAA-MM-DD
            // Se o back-end mandar timestamp, é preciso fatiar a string
            if(diretor.dataNascimento) {
                inputDataNascimento.value = diretor.dataNascimento.split('T')[0];
            } else {
                inputDataNascimento.value = '';
            }
            
        } else {
            modalTitle.textContent = "Cadastrar Novo Diretor";
            diretorIdEmEdicao = null;
            formDiretor.reset();
        }
    }

    // Função para fechar o modal
    function fecharModal() {
        modal.style.display = "none";
        formDiretor.reset();
        diretorIdEmEdicao = null;
    }

    // Eventos do Modal
    btnNovoDiretor.addEventListener('click', () => abrirModal('cadastrar'));
    spanClose.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);

    // Fechar ao clicar fora da janela
    window.addEventListener('click', (event) => {
        if (event.target === modal) fecharModal();
    });


    /* ====================================================================
       4. INTEGRAÇÃO COM O BACK-END (CRUD)
       ==================================================================== */

    // Função auxiliar para exibir data no formato DD/MM/AAAA na tabela
    function formatarDataBr(dataString) {
        if (!dataString) return 'Não informada';
        const dataApenas = dataString.split('T')[0]; // Remove hora se houver
        const partes = dataApenas.split('-');
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return dataString;
    }

    // [ READ ] Buscar todos os diretores
    async function carregarDiretores() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Erro ao buscar diretores');
            
            const diretores = await response.json();
            renderizarTabela(diretores);
        } catch (error) {
            console.error("Erro na comunicação com a API:", error);
            tabelaDiretores.innerHTML = `<tr><td colspan="4" class="text-center">Não foi possível carregar os diretores. Verifique se a API está rodando.</td></tr>`;
        }
    }

    // Renderizar dados na tabela
    function renderizarTabela(diretores) {
        tabelaDiretores.innerHTML = ''; // Limpa a tabela
        
        diretores.forEach(diretor => {
            const tr = document.createElement('tr');
            
            // Ajuste "diretor.nomeDiretor" se sua API usar apenas "diretor.nome"
            const nomeExibicao = diretor.nomeDiretor || diretor.nome;

            tr.innerHTML = `
                <td>${nomeExibicao}</td>
                <td>${diretor.nacionalidade}</td>
                <td>${formatarDataBr(diretor.dataNascimento)}</td>
                <td class="action-cells">
                    <button class="btn-icon edit-btn" onclick="prepararEdicao(${diretor.id})" title="Editar">
                        ✏️
                    </button>
                    <button class="btn-icon delete-btn" onclick="deletarDiretor(${diretor.id})" title="Excluir">
                        🗑️
                    </button>
                </td>
            `;
            tabelaDiretores.appendChild(tr);
        });
    }

    // [ CREATE / UPDATE ] Salvar Formulário
    formDiretor.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Monta o objeto com os dados do form
        const dadosDiretor = {
            nomeDiretor: inputNome.value, // Pode precisar mudar a chave para 'nome' dependendo da sua API
            nacionalidade: inputNacionalidade.value,
            dataNascimento: inputDataNascimento.value
        };

        try {
            if (diretorIdEmEdicao) {
                // Modo: EDIÇÃO (PUT)
                const response = await fetch(`${API_URL}/${diretorIdEmEdicao}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosDiretor)
                });

                if (!response.ok) throw new Error('Erro ao atualizar diretor');
                alert('Diretor atualizado com sucesso!');

            } else {
                // Modo: CADASTRO (POST)
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosDiretor)
                });

                if (!response.ok) throw new Error('Erro ao cadastrar diretor');
                alert('Diretor cadastrado com sucesso!');
            }

            fecharModal();
            carregarDiretores(); // Recarrega a tabela atualizada

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Ocorreu um erro ao salvar. Verifique o console.");
        }
    });

    // [ READ ONE ] Buscar diretor específico para edição
    window.prepararEdicao = async function(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Erro ao buscar dados do diretor');
            
            const diretor = await response.json();
            abrirModal('editar', diretor); // Abre o modal preenchido
        } catch (error) {
            console.error("Erro ao buscar diretor para edição:", error);
            alert("Não foi possível carregar os dados para edição.");
        }
    }

    // [ DELETE ] Excluir Diretor
    window.deletarDiretor = async function(id) {
        const confirmar = confirm("Tem certeza que deseja excluir este diretor?");
        if (!confirmar) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erro ao deletar diretor');
            
            alert('Diretor removido com sucesso!');
            carregarDiretores(); // Atualiza a tabela

        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Não foi possível excluir o diretor.");
        }
    }

    /* ====================================================================
       5. INICIALIZAÇÃO
       ==================================================================== */
    // Chama a função para preencher a tabela assim que a página carregar
    carregarDiretores();
});