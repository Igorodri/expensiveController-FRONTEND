//Variáveis Goblais
const tabela = document.getElementById("table_cash").getElementsByTagName('tbody')[0];
let controller = true;
const cabecalho = document.getElementById("head-tr");
const linhas = document.getElementById("table_cash").getElementsByTagName("tbody")[0].rows;

//Verificação de Autenticação
function verificarAutenticacao() {
    const token = localStorage.getItem('token'); 
    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = 'index.html'; 
}
}

// Lista de registros
async function lista() {
    const token = localStorage.getItem('token');

    if (!token) {
        Toastify({
            text: "Usuário não autenticado. Faça login novamente",
            duration: 5000,
            gravity: "top",
            position: "center",
            close: true,
            stopOnFocus: true,
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
                        <td><input type="text" class="expensive_spent"  value="${record.expensive_spent}"></td>
                        <td><input type="number" class="expensive_cash" value="${record.expensive_cash}"></td>
                    `;
                });

            } else{
                Toastify({
                    text: "Nenhum registro encontrado",
                    duration: 5000,
                    gravity: "top",
                    position: "center",
                    close: true,
                    stopOnFocus: true,
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
            close: true,
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
            }
        }).showToast();
    }
}


//Adicionar Linha
async function addRow() {
    const newRow = tabela.insertRow();
    newRow.innerHTML = `
        <td>
            <p class="expensive_id"></p>
        </td>
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
    const th = document.createElement('th');
    th.textContent = 'Concluir';

    if(controller == true){
        cabecalho.appendChild(th);
        controller = false
    }

    addRow();
})


//Deletar registro
async function deleteRow() {
    const linhas = document.querySelectorAll('#table_cash tbody tr');

    linhas.forEach((linha) => {

        if (!linha.querySelector('.btn-deletar')) {
            const novaCelula = linha.insertCell(-1);
            novaCelula.innerHTML = `<button class="btn-deletar">Deletar</button>`;

            const botaoDeletar = novaCelula.querySelector('.btn-deletar');

            // Adiciona o evento para deletar
            botaoDeletar.addEventListener('click', async () => {
                const idElement = linha.querySelector('.expensive_id');

                const id = parseInt(idElement.textContent, 10); 
                    
                const token = localStorage.getItem('token');

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

                        linha.remove();
                    } else {
                        Toastify({
                            text: "Erro ao deletar o registro",
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
            });
        }
    });
}




document.getElementById('delete-btn').addEventListener("click", () => {
    const th = document.createElement('th');
    th.textContent = 'Deletar';

    if (controller === true) {
        document.querySelector('thead tr').appendChild(th);
        controller = false;
    }

    deleteRow();
});




function cancelar(){
    cabecalho.innerHTML = `
                    <th>ID</th>
                    <th>Categoria de gasto</th>
                    <th>O que foi gasto</th>
                    <th>Quanto foi gasto</th>
    `;

    lista();
}



document.getElementById("cancelar-btn").addEventListener("click", cancelar)



verificarAutenticacao();
lista();







