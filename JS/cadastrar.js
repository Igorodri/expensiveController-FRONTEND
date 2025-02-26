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
            Toastify({
                text: "Usuário cadastrado com sucesso!",
                duration: 5000,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right,rgb(19, 206, 31),rgb(50, 188, 29))"
                },
                onClick: function(){} 
              }).showToast();
        }else {
            console.error("Erro ao cadastrar usuário". data.error);
            Toastify({
                text: "Erro ao cadastrar usuário, tente novamente",
                duration: 5000,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right,rgb(206, 19, 19),rgb(188, 29, 29))"
                },
                onClick: function(){} 
              }).showToast();
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

    if(password_confirm !== password){
        alert("Campo Confirmar Senha diferente do campo Senha")
        return
    }

    cadastrar(user,password,password_confirm)

    document.getElementById("form-cadastro").reset()
})