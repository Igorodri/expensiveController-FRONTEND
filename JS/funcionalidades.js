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

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

const dataAtual = new Date();
let mesIndex = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();

function atualizarData(){
    const mes = meses[mesIndex];
    document.getElementById("mesAno").textContent = `${mes} - ${anoAtual}`    
}

function avancarData(){
    mesIndex++;
    if(mesIndex > 11){
        mesIndex = 0;
        if(anoAtual != "2025"){
            anoAtual++;
        }
    }
    atualizarData()
}

document.getElementById("avancarMes").addEventListener("click",avancarData);

function voltarData(){
    mesIndex--;
    if(mesIndex < 0){
        mesIndex = 11;
        anoAtual--
    }
    atualizarData()
}

document.getElementById("anteriorMes").addEventListener("click",voltarData);

atualizarData()
