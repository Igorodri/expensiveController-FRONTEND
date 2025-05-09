// Variáveis Globais
const tabela = document.getElementById("table_cash").getElementsByTagName('tbody')[0];
const btnFlutuante = document.getElementById("btn-flutuante");
const btnDeletar = document.getElementById("btn-deletar");
const btnConcluir = document.getElementById("btn-concluir");
const btnConcluirEdicao = document.getElementById("btn-concluir-editar");
const tbody = tabela;
let linhaSelecionada = null;
let habilitado = true;
let habilitadoEdicao = false;


// Verificação de Autenticação
function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = 'index.html';
    }
}

    // Btn Flutuante
    tabela.addEventListener("click", (e) => {
        const linha = e.target.closest("tr");
        if (!linha) return;
    
        const idElement = linha.querySelector(".expensive_id");
        const id = idElement ? idElement.textContent.trim() : null;

        if (!id) return;
    
        const rect = linha.getBoundingClientRect();
        btnFlutuante.style.top = `${window.scrollY + rect.top + rect.height / 2 - 15}px`;
        btnFlutuante.style.left = `${window.scrollX + rect.left - 60}px`;
        btnFlutuante.style.display = "block";
    
        btnDeletar.style.top = `${window.scrollY + rect.top + rect.height / 2 - 15}px`;
        btnDeletar.style.left = `${window.scrollX + rect.left - 120}px`;
        btnDeletar.style.display = "block";
    
        linhaSelecionada = linha;
    });
    

    document.querySelector("body").addEventListener("click", (e) => {
        const clicouForaDaTabela = !tabela.contains(e.target);
    
        if (clicouForaDaTabela) {
            btnFlutuante.style.display = "none";
            btnDeletar.style.display = "none";
            btnConcluirEdicao.style.display = "none";
        }
    });


// Deletar Registro
async function deleteRow() {
    if (!linhaSelecionada) return;

    const token = localStorage.getItem('token');
    const idElement = linhaSelecionada.querySelector(".expensive_id");

    if (!idElement) return;

    const id = idElement.textContent.trim();

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
        console.log(error)
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


function habilitarEdicao(linha) {
    if (!linha) return;

    const categoria = linha.querySelector(".categoria");
    const expensive_cash = linha.querySelector(".expensive_cash");
    const expensive_spent = linha.querySelector(".expensive_spent");

    const campos = [categoria, expensive_cash, expensive_spent];

    campos.forEach(input => {
        if (!habilitadoEdicao) {
            input.removeAttribute("disabled");

            const rect = linha.getBoundingClientRect();
            btnConcluirEdicao.style.top = `${window.scrollY + rect.top + rect.height / 2 - 15}px`;
            btnConcluirEdicao.style.left = `${window.scrollX + rect.right + 10}px`;
            btnConcluirEdicao.style.display = "block";

        } else {
            input.setAttribute("disabled", true);
            btnConcluirEdicao.style.display = "none";
            linhaSelecionada = null
        }
    });

    habilitadoEdicao = !habilitadoEdicao;
}

btnFlutuante.addEventListener("click", (e) => {
    if (linha) {
        habilitarEdicao(linha);
    }
});



//Função para Editar Registros
async function editarRow() {
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

    try{
       const response = await fetch('http://localhost:3000/editar', {
            method : 'PUT',
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },

            body: JSON.stringify({
                expensive_id: id,
                expensive_category: category,
                expensive_spent: spent,
                expensive_cash: cash,
                userId : userId
            })
       });

       if (response.ok) {
        Toastify({
            text: "Registro editado com sucesso!",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();

        lista()
        btnConcluirEdicao.style.display = 'none';
        btnDeletar.style.display = 'none';
        btnFlutuante.style.display = 'none';
    } else {
        Toastify({
            text: "Erro ao editar o registro",
            duration: 5000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #d00000, #8e0000)"
            }
        }).showToast();
    }

    }catch(error){
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



btnConcluirEdicao.addEventListener("click", editarRow);



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
                        <td class="td-expensive_id">
                            <p class="expensive_id">${record.id}</p>
                        </td>
                        <td>
                            <select class="categoria" name="expensive_category" disabled>
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
                        <td><input type="text" class="expensive_spent" disabled value="${record.expensive_spent}"></td>
                        <td><input type="number" class="expensive_cash" disabled value="${record.expensive_cash}"></td>
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
        <td class="td-expensive_id"><p class="expensive_id"></p></td>
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
    `;

        const rect = newRow.getBoundingClientRect();
        btnConcluir.style.top = `${window.scrollY + rect.top + rect.height / 2 -15}px`;
        btnConcluir.style.left = `${window.scrollX + rect.right + 10}px`;
        btnConcluir.style.display = "none";

        linhaSelecionada = newRow

    // Adiciona evento ao botão "Concluir"
    btnConcluir.onclick = async () => {
        const category = newRow.querySelector('.categoria').value;
        const spent = newRow.querySelector('.expensive_spent').value;
        const cash = newRow.querySelector('.expensive_cash').value;

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
            habilitado = true;
            linhaSelecionada = null;
            btnConcluir.style.display = 'none'
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
    };
}



document.getElementById("add-btn").addEventListener("click", () => {
    if(habilitado === false){
        lista();
        habilitado = true
        btnConcluir.style.display = "none";
        btnFlutuante.style.display = "none";
        btnDeletar.style.display = "none";
        linhaSelecionada = null;
    }else{
        addRow()
        habilitado = false
        btnConcluir.style.display = "block";
        }
    });

// Carrega a página
verificarAutenticacao();
lista();
