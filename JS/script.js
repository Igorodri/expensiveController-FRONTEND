async function verificar_usuario(username, password){
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password : password
        })
    });

    const data = await responde.json();

    if(response.ok){
        console.log("Login efetuado com sucesso!", data)

        localStorage.setItem('authToken', data.token);
    }else {
        console.log("Erro ao realizar login: ", data.message)
    }
}

document.getElementById("form-login").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    verificar_usuario(username, password);

    document.getElementById("form-login").reset()
})