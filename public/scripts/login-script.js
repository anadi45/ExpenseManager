const loginCred = document.querySelector("#loginCred");
const inputPassword = document.querySelector("#inputPassword");
const loginButton = document.querySelector("#loginButton");
let modal = document.querySelector("#myModal");
const closeModal = document.querySelectorAll(".close")[0];

loginButton.addEventListener("click", async() => {

    const loggedIn = await fetch("/api/v1/user/login", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*"
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            loginCred: loginCred.value,
            password: inputPassword.value
        })
    })

    const response = await loggedIn.json();
    window.localStorage.setItem("jwtoken", response.token);
    console.log(loggedIn.status)

    if (loggedIn.status === 400) {
        modal.style.display = "block";
    } else if (loggedIn.status === 201) {
        window.location.href = "https://ranjeetbaraik-expense-manager.onrender.com/home";
    }
});



closeModal.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}