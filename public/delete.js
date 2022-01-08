//Targeting table row and deleting through id
function del(id) {
    const btnNode = document.querySelector(`#${id}`);
    const root = btnNode.parentNode.parentNode;

    const title = root.children[0].innerHTML;
    const amount = root.children[1].innerHTML;

    fetch("api/expense", {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: "DELETE",
            body: JSON.stringify({
                title: title,
                amount: amount
            })
        })
        .then(() => {
            window.location.reload(true);
        })
        .catch((err) => {
            console.error(err);
        });
}