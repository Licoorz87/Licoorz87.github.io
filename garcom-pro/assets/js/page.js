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
        if (page === "order.html") {
            context = loadOrder();
            ctx = context[0];
            number = context[1];
            if (ctx == null || ctx == "") {
                ctx = "<span>Parece que você ainda não tem pedidos salvos. Clique em [+] para salvar um novo pedido.</span>";
            }
        } else {
            ctx = 0; //LoadResult();
        }

        document.querySelector(".main").innerHTML = html;
        document.querySelector(".orders__history").innerHTML = ctx;


        newMsg = document.querySelector("#order_msg");
        newOrder = document.querySelector(".new-order");
        toggleNewOrderButton = document.querySelectorAll(".toggle-new-order__button");
        toggleNewOrderTypePayment = document.querySelectorAll(".toggle-new-order__type-payment");
        newOrderTypePaymentBg = document.querySelector(".new-order__type-payment--bg");
        newOrderTypePaymentItem = document.querySelectorAll(".new-order__type-payment--item");
        newOrderTypePaymentSelectSpan = document.querySelector(".new-order__type-payment--select-span");
        newOrderShowBool = false;
        commissionCheck = document.querySelector("#commission");
        newOrderKeyboardKey = document.querySelectorAll(".new-order__keyboard--key");
        newOrderVisorValue = document.querySelector(".new-order__visor--value");
        submitButton = document.querySelector("#new-order__submit");
        document.querySelector(".main__ordersNum").innerHTML = `(${number}/350)`;
        trash = document.querySelectorAll(".trash");

        initializeOrderEvents()
    });
}