async function verificar_usuario(username, password){
    const userData = {
        username: username,
        password: password
    }

   try{
    const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(userData)
    });

    const data = await response.json()

    if(response.ok){
        console.log("Bem-vindo ao Scale Cash", data)

        setTimeout(
            window.location.href = 'Controlador.html'
        ),2000

    }else{
        console.error("Erro ao logar", data.error)
    }


   }catch(error){
    console.error("Erro de conexão: ", error)
}
}

document.getElementById("form-login").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    verificar_usuario(username, password);

    document.getElementById("form-login").reset()
})