const inputEmail = document.querySelector("#inputEmail");
let modal = document.querySelector("#myModal");
const closeModal = document.querySelectorAll(".close")[0];
const modalButton = document.querySelector("#modalButton");
const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", async() => {
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
    modal.style.display = "block";
});

modalButton.addEventListener("click", () => {
    window.location.href = "http://anadi45-expense-manager.herokuapp.com/login"
});

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}