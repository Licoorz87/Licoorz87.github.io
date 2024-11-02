// Function
function loadPage(page) {
    fetch('templates/' + page)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo HTML.');
        }
        return response.text();
    })
    .then(html => {
        document.querySelector(".main").innerHTML = html;

        if (page === "order.html") {
            let context = loadOrder();
            let orderHTML = context[0];
            let numberOrders = context[1];
            if (numberOrders == 0) {
                orderHTML = "<span>Parece que você ainda não tem pedidos salvos. Clique em [+] para salvar um novo pedido.</span>";
            }
            document.querySelector(".orders__history").innerHTML = orderHTML;
            document.querySelector(".main__ordersNum").innerHTML = `(${numberOrders}/150)`;
        } else {
            orderHTML = 0; //LoadResult();
        }

        initializeOrderElements();
        initializeOrderEvents();
    });
}