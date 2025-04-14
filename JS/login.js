//Login
async function verificar_usuario(username, password){
   try{
    const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            username: username,
            password: password,

        }),
    });

    const data = await response.json()

    if (response.ok) {
        console.log("Bem-vindo ao Scale Cash", data);
        localStorage.setItem('token', data.token);
    
        setTimeout(() => {
            window.location.href = 'Controlador.html';
        }, 100);
    } else {
        console.error("Erro ao logar:", data.error);
    
        Toastify({
            text: data.error || "Erro ao logar",
            duration: 5000,
            gravity: "top",
            position: "center",
            close: true,
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
            },
            onClick: function(){} 
          }).showToast();
        console.error("Erro ao logar", data.error)
    }

    return res.status(200).json({
        message: "Login bem-sucedido!",
        token
    });


   }catch(error){
    console.error("Erro de conexão: ", error)
}
}

document.getElementById("form-login").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    verificar_usuario(username, password);
    //Usuário admin
    //admin
    //admin@123

    document.getElementById("form-login").reset()
})