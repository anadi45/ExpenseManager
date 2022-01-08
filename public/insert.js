const title = document.querySelector("#title")
const amount = document.querySelector("#amount");
const addbtn = document.querySelector("#addBtn");
const updatebtn = document.querySelector("#updateBtn");
const tabbody = document.querySelector("#tabbody");
const budgetbody = document.querySelector("#budget");


//Populating the table after response from database
function refreshTable(expenses) {
    let total = 0;
    let table = `
        <tr>
            <th>Title</th>
            <th>Amount</th>
        </tr>`;
    expenses.forEach((expense, index) => {

        total += expense.amount;
        table += `
        <tr>
        <td>${expense.title}</td>
        <td>${expense.amount}</td>
        <td><button class="button is-danger table-button delete " onclick="del(id)" id="btn${index}"></button></td>
        </tr>`
    });
    table += `
        <tr>
        <th style="padding-top:0px">Total</th>
        <td>${total}</td>
        </tr>`
    tabbody.innerHTML = table;
}

//Populating buddget div from database
function refreshBudget(budget) {
    let budgetHtml = `
        <tr>
            <th style="padding-top:0px">Budget</th>
            <td>${budget[budget.length - 1].totalAmount}</td>
        </tr>
    `;
    budgetbody.innerHTML = budgetHtml;
}

//Api call for getting expenses from database
fetch("https://anadi45-expense-manager.herokuapp.com/api/expense")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        refreshTable(data);
    })
    .catch((err) => {
        console.error(err);
    });

//Api call for getting budget(total)
fetch("https://anadi45-expense-manager.herokuapp.com/api/total")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        refreshBudget(data);
    })
    .catch((err) => {
        console.error(err);
    });

//Saving individual expense to database
addbtn.addEventListener("click", () => {

    fetch("https://anadi45-expense-manager.herokuapp.com/api/expense", {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                title: title.value,
                amount: amount.value
            })
        })
        .then((response) => {
            return response.json();
        })
        .then(() => {
            window.location.reload(true);
        })
        .catch((err) => {
            console.error(err);
        });

});

//Saving budget to database
updatebtn.addEventListener("click", () => {

    fetch("https://anadi45-expense-manager.herokuapp.com/api/total", {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                totalAmount: total.value
            })
        })
        .then((response) => {
            return response.json();
        })
        .then(() => {
            window.location.reload(true);
        })
        .catch((err) => {
            console.error(err);
        });
});