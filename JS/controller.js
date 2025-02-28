//Controller
function add_registro() {
    const tabela = document.getElementById("table_cash").getElementsByTagName('tbody')[0];
    const newRow = tabela.insertRow();

    newRow.innerHTML = `
                        <td>
                            <p>1</p>
                        </td>
                        <td>
                            <select class="categoria">
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
                        <td><input type="text" id="text_cash"></td>
                        <td><input type="number" id="number"></td>
           
    `;
}

document.getElementById('add-btn').addEventListener("click", add_registro)




async function save_cash(expensive_category, expensive_spent, expensive_cash) {
    try {
        const response = await fetch('http://localhost:3000/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                expensive_category: expensive_category,
                expensive_spent: expensive_spent,
                expensive_cash: expensive_cash
            }),
            credentials: 'include'
        });

        const datas = await response.json();

        if (response.ok) {
            console.log("Registro salvo com sucesso", datas);

            Toastify({
                text: "Registros Salvos com sucesso!",
                duration: 5000,
                gravity: "top",
                position: "center",
                close: true,
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgb(19, 206, 31), rgb(50, 188, 29))"
                }
            }).showToast();
        } else {
            console.error("Erro ao salvar registros", datas?.error || "Erro desconhecido");

            Toastify({
                text: datas?.error || "Erro ao salvar registros",
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


document.getElementById("save-btn").addEventListener("click", () => {
    const expensive_category = document.getElementById("expensive_category").value;
    const expensive_spent = document.getElementById("expensive_spent").value;
    const expensive_cash = document.getElementById("expensive_cash").value;

    save_cash(expensive_category,expensive_spent,expensive_cash)

})






