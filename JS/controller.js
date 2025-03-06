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
                const tabela = document.getElementById("table_cash").getElementsByTagName('tbody')[0];
                
                tabela.innerHTML = '';

                datas.data.forEach(record => {
                    const newRow = tabela.insertRow();
                    newRow.innerHTML = `
                        <td>
                            <p id="expensive_id">${record.id}</p>
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


//Adicionar - Em produção
async function adicionar_cash(expensive_category, expensive_spent, expensive_cash) {
    const token = localStorage.getItem('token')

    if(!token){
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

    try{
        const response = await fetch('http://localhost:3000/adicionar', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            },
        })

        const datas = await response.json();

        if(response.ok){
            console.log("Adicionando Registro ao banco de dados", datas);



            return res.status(200).json({message: 'Registros adicionados com sucesso!'})
        }else{
            console.log("Não foi possível adicionar o registro", datas.error);

            Toastify({
                text: "Não foi possível adicionar o registro",
                duration: 5000,
                gravity: "top",
                position: "center",
                close: true,
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
                }
            }).showToast();

            return res.status(401).json({error: 'Não foi possível adicionar o registro'})
        }

    }catch(error){
        console.error('Erro interno no servidor');

        Toastify({
            text: "Erro interno no servidor",
            duration: 5000,
            gravity: "top",
            position: "center",
            close: true,
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
            }
        }).showToast();

        return res.status(500).json({error: 'Erro interno no servidor'})

    }
}

// document.getElementById('concluir').addEventListener("click", () =>{
    
// })


verificarAutenticacao();
lista();







