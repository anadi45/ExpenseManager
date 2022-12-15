const addExpenseButton = document.querySelector("#addExpenseButton");
const setBudgetButton = document.querySelector("#setBudgetButton");
let tableContainer = document.querySelector("#table-container");
let budgetBody = document.querySelector("#budgetBody");
let remarksBody = document.querySelector("#remarksBody");
let addExpenseModal = document.querySelector("#addExpenseModal");
let setBudgetModal = document.querySelector("#setBudgetModal");
const closeExpenseModal = document.querySelector("#closeExpenseModal");
const closeBudgetModal = document.querySelector("#closeBudgetModal");
const submitExpense = document.querySelector("#submitExpense");
const submitBudget = document.querySelector("#submitBudget");
const token = window.localStorage.getItem("jwtoken");

const evaluateExpense = (total, budget) => {

    if (total <= (budget / 2)) {
        remarksBody.innerText = "Spendings in check";
    } else if (total < budget) {
        remarksBody.innerText = "High spendings";
    } else {
        remarksBody.innerText = "Overspending";
    }
}

const updateExpenses = (data) => {
    let tableHtml = "";
    let total = 0;
    data.forEach((expense) => {
        total += expense.amount;
        let rowHtml = `<hr><div class="row">
            <div class="col-sm-4">${expense.title}</div>
            <div class="col-sm-2">${expense.amount}</div>
            <div class="col-sm-2"><button id="${expense._id}" onclick="deleteExpense(id)"><i class="fa-solid fa-trash-can"></i></button></div>
        </div>`;
        tableHtml += rowHtml;
    });
    let totalHtml = `<div class="row" id="total">
    <div class="col-sm-4">Total Spendings</div>
    <div class="col-sm-2" id="totalAmountDiv">${total}</div>
    </div>`;
    tableHtml += totalHtml;
    tableContainer.innerHTML = tableHtml;

    let totalAmountDiv = document.querySelector("#totalAmountDiv");
    let current = parseInt(totalAmountDiv.innerText);
    let budget = parseInt(budgetBody.innerText);
    evaluateExpense(current, budget)
}

const updateBudget = (data) => {
    budgetBody.innerHTML = data[0].totalBudget;

    let totalAmountDiv = document.querySelector("#totalAmountDiv");
    let current = parseInt(totalAmountDiv.innerText);
    evaluateExpense(current, data[0].totalBudget)
}



const refreshData = async() => {

    const fetchExpenses = await fetch("/api/v1/expense/viewexpenses", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "GET",
        credentials: "include"
    });
    const expenses = await fetchExpenses.json();

    if (fetchExpenses.status != 406) {
        updateExpenses(expenses);
    }


    const fetchBudget = await fetch("/api/v1/budget/viewbudget", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "GET",
        credentials: "include"
    });
    const budget = await fetchBudget.json();

    if (fetchBudget.status != 406) {
        updateBudget(budget);
    }
}


const deleteExpense = async(id) => {
    const expenseDeleted = await fetch("/api/v1/expense/deleteexpense", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*"
        },
        method: "DELETE",
        body: JSON.stringify({
            expenseId: id
        })
    });


    const expenseElement = document.querySelector(`[id='${id}']`);
    const expenseParent = expenseElement.parentNode.parentNode;
    let totalAmountDiv = document.querySelector("#totalAmountDiv");
    let current = parseInt(totalAmountDiv.innerText);
    let deduction = parseInt(expenseParent.children[1].innerText);
    const net = current - deduction;
    totalAmountDiv.innerText = net;

    const budget = parseInt(budgetBody.innerText);
    evaluateExpense(net, budget);

    if (expenseDeleted) {
        expenseParent.remove();
    }
}

submitExpense.addEventListener("click", async() => {
    const inputTitle = document.querySelector("#inputTitle");
    const inputAmount = document.querySelector("#inputAmount");

    const submit = await fetch("/api/v1/expense/createexpense", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            title: inputTitle.value,
            amount: inputAmount.value
        })
    });

    if (submit.status == 201) {
        addExpenseModal.style.display = "none";
        refreshData();
    }
    const result = await submit.json();

});

submitBudget.addEventListener("click", async() => {
    const inputBudget = document.querySelector("#inputBudget");

    const submit = await fetch("/api/v1/budget/setbudget", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            budget: inputBudget.value
        })
    });

    if (submit.status == 201) {
        setBudgetModal.style.display = "none";
        refreshData();
    }
});

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
        window.location.href = "https://ranjeetbaraik-expense-manager.onrender.com";
    }
}

refreshData();


addExpenseButton.addEventListener("click", () => {
    addExpenseModal.style.display = "block";
});

closeExpenseModal.onclick = function() {
    addExpenseModal.style.display = "none";
}

setBudgetButton.addEventListener("click", () => {
    setBudgetModal.style.display = "block";
});


closeBudgetModal.onclick = function() {
    setBudgetModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == addExpenseModal) {
        addExpenseModal.style.display = "none";

    }
    if (event.target == setBudgetModal) {
        setBudgetModal.style.display = "none";
    }
}