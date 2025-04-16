// Variáveis Globais
const tabela = document.getElementById("table_cash").getElementsByTagName('tbody')[0];
const btnFlutuante = document.getElementById("btn-flutuante");
const btnDeletar = document.getElementById("btn-deletar");
const tbody = tabela;
let clicado = 0;


// Verificação de Autenticação
function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = 'index.html';
    }
}

// Btn Flutuante
let linhaSelecionada = null;

tabela.addEventListener("click", (e) => {
    const linha = e.target.closest("tr");

    if (linha) {
        if (linhaSelecionada === linha) {
            btnFlutuante.style.display = "none";
            btnDeletar.style.display = "none";
            linhaSelecionada = null;
        } else {
            const rect = linha.getBoundingClientRect();
            btnFlutuante.style.top = `${window.scrollY + rect.top + rect.height / 2 - 15}px`;
            btnFlutuante.style.left = `${window.scrollX + rect.left - 80}px`;
            btnFlutuante.style.display = "block";

            btnDeletar.style.top = `${window.scrollY + rect.top + rect.height / 2 - 15}px`;
            btnDeletar.style.left = `${window.scrollX + rect.left - 160}px`;
            btnDeletar.style.display = "block";

            linhaSelecionada = linha;
        }
    }
});



// Deletar Registro
async function deleteRow() {
    if (!linhaSelecionada) return;

    const token = localStorage.getItem('token');
    const idElement = linhaSelecionada.querySelector(".expensive_id");

    if (!idElement) return;

    const id = idElement.textContent;

    try {
        const response = await fetch('http://localhost:3000/deletar', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                expensive_id: id,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            Toastify({
                text: "Registro deletado com sucesso!",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();

            linhaSelecionada.remove();
            btnFlutuante.style.display = "none";
            btnDeletar.style.display = "none";
        } else {
            Toastify({
                text: data.message || "Erro ao deletar o registro",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #d00000, #8e0000)",
                },
            }).showToast();
        }
    } catch (error) {
        Toastify({
            text: "Erro de comunicação com o servidor",
            duration: 5000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #d00000, #8e0000)",
            },
        }).showToast();
    }
}

// Vincula a função ao botão deletar
btnDeletar.addEventListener("click", deleteRow);



//Função para Editar Registros
async function editarRow(){
    if(!linhaSelecionada) return;


}


// Função para listar registros
async function lista() {
    const token = localStorage.getItem('token');

    if (!token) {
        Toastify({
            text: "Usuário não autenticado. Faça login novamente",
            duration: 5000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
            }
        }).showToast();
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/lista', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const datas = await response.json();

        if (response.ok) {
            console.log("Registros listados com sucesso", datas);

            if (datas.data && datas.data.length > 0) {
                tabela.innerHTML = '';

                datas.data.forEach(record => {
                    const newRow = tabela.insertRow();
                    newRow.innerHTML = `
                        <td>
                            <p class="expensive_id">${record.id}</p>
                        </td>
                        <td>
                            <select class="categoria" name="expensive_category">
                                <option value="none" class="expensive_category" selected disabled></option>
                                <option value="conta_imovel" class="expensive_category" ${record.expensive_category === 'conta_imovel' ? 'selected' : ''}>Conta Imóvel</option>
                                <option value="parcela" class="expensive_category" ${record.expensive_category === 'parcela' ? 'selected' : ''}>Parcela</option>
                                <option value="alimentacao" class="expensive_category" ${record.expensive_category === 'alimentacao' ? 'selected' : ''}>Alimentação</option>
                                <option value="transporte" class="expensive_category" ${record.expensive_category === 'transporte' ? 'selected' : ''}>Transporte</option>
                                <option value="saude" class="expensive_category" ${record.expensive_category === 'saude' ? 'selected' : ''}>Saúde</option>
                                <option value="educacao" class="expensive_category" ${record.expensive_category === 'educacao' ? 'selected' : ''}>Educação</option>
                                <option value="lazer" class="expensive_category" ${record.expensive_category === 'lazer' ? 'selected' : ''}>Lazer</option>
                                <option value="assinaturas" class="expensive_category" ${record.expensive_category === 'assinaturas' ? 'selected' : ''}>Assinaturas</option>
                                <option value="vestuario" class="expensive_category" ${record.expensive_category === 'vestuario' ? 'selected' : ''}>Vestuário</option>
                                <option value="contas_energia" class="expensive_category" ${record.expensive_category === 'contas_energia' ? 'selected' : ''}>Conta de Energia</option>
                                <option value="contas_agua" class="expensive_category" ${record.expensive_category === 'contas_agua' ? 'selected' : ''}>Conta de Água</option>
                                <option value="internet" class="expensive_category" ${record.expensive_category === 'internet' ? 'selected' : ''}>Internet</option>
                                <option value="telefone" class="expensive_category" ${record.expensive_category === 'telefone' ? 'selected' : ''}>Telefone</option>
                                <option value="outros" class="expensive_category" ${record.expensive_category === 'outros' ? 'selected' : ''}>Outros</option>
                            </select>
                        </td>
                        <td><input type="text" class="expensive_spent" value="${record.expensive_spent}"></td>
                        <td><input type="number" class="expensive_cash" value="${record.expensive_cash}"></td>
                    `;
                });
            } else {
                Toastify({
                    text: "Nenhum registro encontrado",
                    duration: 5000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
                    }
                }).showToast();
            }
        }
    } catch (error) {
        console.error("Erro de conexão: ", error);

        Toastify({
            text: "Erro de conexão com o servidor",
            duration: 5000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
            }
        }).showToast();
    }
}

// Adicionar nova linha
async function addRow() {
    const newRow = tabela.insertRow();
    newRow.innerHTML = `
        <td><p class="expensive_id"></p></td>
        <td>
            <select class="categoria" name="expensive_category">
                <option value="none" selected disabled></option>
                <option value="conta_imovel">Conta Imóvel</option>
                <option value="parcela">Parcela</option>
                <option value="alimentacao">Alimentação</option>
                <option value="transporte">Transporte</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
                <option value="lazer">Lazer</option>
                <option value="assinaturas">Assinaturas</option>
                <option value="vestuario">Vestuário</option>
                <option value="contas_energia">Conta de Energia</option>
                <option value="contas_agua">Conta de Água</option>
                <option value="internet">Internet</option>
                <option value="telefone">Telefone</option>
                <option value="outros">Outros</option>
            </select>
        </td>
        <td><input type="text" class="expensive_spent"></td>
        <td><input type="number" class="expensive_cash"></td>
        <td><button class="btn-concluir">Concluir</button></td>
    `;

    // Adiciona evento ao botão "Concluir"
    newRow.querySelector('.btn-concluir').addEventListener('click', async () => {
        const category = newRow.querySelector('.categoria').value;
        const spent = newRow.querySelector('.expensive_spent').value;
        const cash = newRow.querySelector('.expensive_cash').value;
        clicado = 0

        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/adicionar', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                expensive_category: category,
                expensive_spent: spent,
                expensive_cash: cash
            })
        });

        const data = await response.json();

        if (response.ok) {
            Toastify({
                text: "Registro salvo com sucesso!",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                }
            }).showToast();

            newRow.querySelector('.expensive_id').textContent = data.data[0].id;
            lista()
        } else {
            Toastify({
                text: "Erro ao salvar o registro",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #d00000, #8e0000)"
                }
            }).showToast();
        }
    });
}



document.getElementById("add-btn").addEventListener("click", () => {
    if(clicado === 1){
        lista();
        clicado = 0
    }else{
        addRow()
        clicado = 1
    }
});

// Carrega a página
verificarAutenticacao();
lista();
