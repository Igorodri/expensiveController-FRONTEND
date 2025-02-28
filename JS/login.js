//Login
async function verificar_usuario(username, password){
   try{
    const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            username: username,
            password: password
        }),
        credentials: 'include'
    });

    const data = await response.json()

    if(response.ok){
        console.log("Bem-vindo ao Scale Cash", data)

        setTimeout(
            window.location.href = 'Controlador.html'
        ),4000

    }else{
        Toastify({
            text: "Usuário não encontrado",
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