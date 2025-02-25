async function cadastrar(username, password, confirmpassword) {
    const userData = {
        username: username,
        password: password,
        confirmpassword: confirmpassword
    }

    try{
        const response = await fetch('http://localhost:3000/cadastro',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(userData)
        });

        const data = await response.json();

        if(response.ok){
            console.log("Usuário cadastrado com sucesso!", data);
            alert("Usuário cadastrado com sucesso!")
        }else {
            console.error("Erro ao cadastrar usuário". data.error);
        }
    }catch(error){
        console.error("Erro de conexão: ", error)
    }
}

document.getElementById("form-cadastro").addEventListener("submit", (event) => {
    event.preventDefault()

    const user = document.getElementById("user_cadastro").value;
    const password = document.getElementById("senha_cadastro").value;
    const password_confirm = document.getElementById("senha_confirmar").value;

    cadastrar(user,password,password_confirm)

    document.getElementById("form-cadastro").reset()
})