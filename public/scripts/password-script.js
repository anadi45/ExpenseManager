const inputEmail = document.querySelector("#inputEmail");
let modal = document.querySelector("#myModal");
const closeModal = document.querySelectorAll(".close")[0];
const modalButton = document.querySelector("#modalButton");
const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", async() => {
    modal.style.display = "block";
    const getMail = await fetch("/api/v1/user/mailpassword", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*"
        },
        method: "POST",
        body: JSON.stringify({
            mail: inputEmail.value
        })
    });
});

modalButton.addEventListener("click", () => {
    window.location.href = "https://ranjeetbaraik-expense-manager.onrender.com/login"
});

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}