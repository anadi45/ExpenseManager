const token = window.localStorage.getItem("jwtoken");

let expenseLabels = [];
let expenseData = [];

const createChart = (exLabels, exData) => {
    let data = {
        labels: exLabels,
        datasets: [{
            label: "Expenses",
            backgroundColor: "#4be8ae",
            borderColor: "#3684f8",
            borderWidth: 2,
            hoverBackgroundColor: "#3684f8",
            hoverBorderColor: "white",
            data: exData,
        }]
    };

    let options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                stacked: true,
                grid: {
                    display: true,
                    color: "white"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    new Chart('chart', {
        type: "pie",
        options: options,
        data: data
    });
}

const updateChart = async() => {

    const fetchExpenses = await fetch("/api/v1/expense/viewexpenses", {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "Authorization": "Bearer " + token
        },
        method: "GET",
        credentials: "include"
    });

    const fetchedExpenses = await fetchExpenses.json();

    fetchedExpenses.forEach((expense) => {
        expenseLabels.push(expense.title);
        expenseData.push(expense.amount);
    });
    console.log(expenseLabels, expenseData)
    createChart(expenseLabels, expenseData);
}