let detailsBody = document.querySelector("#details");
let titleBody = document.querySelector("#title");
let nameModal = document.querySelector("#nameModal");
let passwordModal = document.querySelector("#passwordModal");
const closeNameModal = document.querySelector("#closeNameModal");
const closePasswordModal = document.querySelector("#closePasswordModal");
const changeNameButton = document.querySelector("#changeNameButton");
const changePasswordButton = document.querySelector("#changePasswordButton");
const changeNameModalButton = document.querySelector("#changeNameModalButton");
const changePasswordModalButton = document.querySelector("#changePasswordModalButton");
let statusChanged = document.querySelector("#status");
const token = window.localStorage.getItem("jwtoken");

const fillDetails = (details) => {
    let detailsHtml = `<div class="row my-5">
    <div class="row-sm-4 mt-5">Name:
        <div class="detail">${details.name}</div>
    </div>
    <div class="row-sm-4 my-3">Email:
        <div class="detail">${details.email}</div>
    </div>
    <div class="row-sm-4 mb-5">Phone:
        <div class="detail">${details.phone}</div>
    </div>
</div>`;

    detailsBody.innerHTML = detailsHtml;
    titleBody.innerHTML = details.name;
}

const fetchData = async() => {

    const fetchDetails = await fetch("http://localhost:3000/api/v1/user/profiledetails", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "GET",
        credentials: "include"
    });

    const details = await fetchDetails.json();

    if (details) {
        fillDetails(details[0]);
    }
}

fetchData();

changeNameModalButton.addEventListener("click", async() => {

    const nameInput = document.querySelector("#nameInput");
    const changed = await fetch("http://localhost:3000/api/v1/user/changename", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
            newName: nameInput.value
        })
    });

    if (changed.status === 201) {
        nameModal.style.display = "none";
        fetchData();
    }
});

changePasswordModalButton.addEventListener("click", async() => {

    const passwordInput = document.querySelector("#passwordInput");
    const changed = await fetch("http://localhost:3000/api/v1/user/changepassword", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
            newPassword: passwordInput.value
        })
    });

    if (changed.status === 201) {
        passwordModal.style.display = "none";
        fetchData();
        statusChanged.innerHTML = `<h3>Password changed successfully</h3>`;
        setTimeout(() => {
            statusChanged.innerHTML = ``;
        }, 2000);
    }
});

changeNameButton.onclick = function() {
    nameModal.style.display = "block";
}

closeNameModal.onclick = function() {
    nameModal.style.display = "none";
}

changePasswordButton.onclick = function() {
    passwordModal.style.display = "block";
}

closePasswordModal.onclick = function() {
    passwordModal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == nameModal) {
        nameModal.style.display = "none";
    }
    if (event.target == passwordModal) {
        passwordModal.style.display = "none";
    }
}

const logout = async() => {

    const loggedOut = await fetch("/api/v1/user/logout", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*"
        },
        method: "GET"
    });

    if (loggedOut.status == 200) {
        localStorage.clear();
        window.location.href = "https://anadi45-expense-manager.herokuapp.com";
    }
}