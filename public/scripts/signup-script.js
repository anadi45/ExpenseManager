const inputName = document.querySelector("#inputName");
const inputEmail = document.querySelector("#inputEmail");
const inputPhone = document.querySelector("#inputPhone");
const inputPassword = document.querySelector("#inputPassword");
const signupButton = document.querySelector("#signupButton");
let modal = document.querySelector("#myModal");
const closeModal = document.querySelectorAll(".close")[0];
let modalStatus = document.querySelector("#modalStatus");
let modalResponse = document.querySelector("#modalResponse");
const modalButton = document.querySelector("#modalButton");

signupButton.addEventListener("click", async() => {
    const signedUp = await fetch("http://localhost:3000/api/v1/user/signup", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*"
        },
        method: "POST",
        body: JSON.stringify({
            name: inputName.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            password: inputPassword.value
        })
    });

    const response = await signedUp.json();

    if (signedUp.status === 400) {
        modalStatus.innerHTML = `<p>Account creation failed.</p>`;
        modalResponse.innerHTML = `<p>Error: ${response.message}.</p>`;
        modal.style.display = "block";
        modalButton.style.display = "none";

    } else if (signedUp.status === 201) {
        modalStatus.innerHTML = `<p>Account created succesfully.</p>`;
        modalResponse.innerHTML = `<p>You can now login with your account.</p>`;
        modal.style.display = "block";
        modalButton.style.display = "block";
    }
});

modalButton.addEventListener("click", () => {
    window.location.href = "http://localhost:3000/login";
});

closeModal.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}