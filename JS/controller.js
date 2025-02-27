const user_profile = document.getElementById("user-profile")
const user_menu = document.getElementById("user-menu")

const sair = document.getElementById("sair")

user_profile.addEventListener("click", () => {
    user_menu.style.display = user_menu.style.display === "block" ? "none" : "block";
})


sair.addEventListener("click", () => {
    window.location.href ='index.html'

    history.replaceState(null, null, 'index.html');

})

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

                        <td class="status">
                            <select>
                                <option value="1" selected>Ativo</option>
                                <option value="0">Inativo</option>
                            </select>
                        </td>
           
    `;
}


document.getElementById('add-btn').addEventListener("click", add_registro)
