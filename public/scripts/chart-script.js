const token = window.localStorage.getItem("jwtoken");

let labels = [];
let data = [];

const createChart = (labels, data) => {
    let data = {
        labels: labels,
        datasets: [{
            label: "Expenses",
            backgroundColor: "#4be8ae",
            borderColor: "#3684f8",
            borderWidth: 2,
            hoverBackgroundColor: "#3684f8",
            hoverBorderColor: "white",
            data: data,
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
        labels.push(expense.title);
        data.push(expense.amount);
    });

    createChart(labels, data);
}