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