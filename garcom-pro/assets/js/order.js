// Functions
function clearOrder() {
    setTimeout(() => {
        selectedTypePayment("pix");
        commissionCheck.checked = false;
        value = 0;
        showVisor();
    }, 400);
}

function toggleNewOrder() {
    if (newOrderShowBool) {
        newOrder.style.left = "100%";
        newOrderShowBool = false;
    } else {
        newOrder.style.left = 0;
        newOrderShowBool = true;
    }
}

function toggleTypePayment() {
    if (newOrderTypePaymentShowBool) {
        newOrderTypePaymentBg.style.display = "none";
        newOrderTypePaymentShowBool = false;
    } else {
        newOrderTypePaymentBg.style.display = "block";
        newOrderTypePaymentShowBool = true;
    }
}

function showVisor() {
    newOrderVisorValue.innerHTML = (value/100).toFixed(2);
}

function newValue(key) {
    if (key == "del") {
        value = Math.floor(value / 10);
    } else {
        value = (value * 10) + parseInt(key);
    }
}

function selectedTypePayment(data) {
    if (data == "pix") {
        html = `<i class="fa-solid fa-p color--black"></i> Pix`;
        typePayment = 0;
    } else if (data == "money") {
        html = `<i class="fa-solid fa-money-bill color--green"></i> Dinheiro`;
        typePayment = 1;
    } else if (data == "debit") {
        html = `<i class="fa-solid fa-credit-card color--yellow"></i> Cartão de Débito`;
        typePayment = 2;
    } else if (data == "credit") {
        html = `<i class="fa-solid fa-credit-card color--blue"></i> Cartão de Crédito`;
        typePayment = 3;
    } else {
        html = `<i class="fa-solid fa-credit-card color--red"></i> Cartão Mumbuca`;
        typePayment = 4;
    }
    
    newOrderTypePaymentSelectSpan.innerHTML = html;
}

function dateFormat(timestamp) {
    let date = new Date(timestamp * 1000);

    const weeks = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    let week = weeks[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${week}, ${day} ${month}, ${year}`;
}

function hourFormat(timestamp) {
    let date = new Date(timestamp * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

function loadOrder() {
    let value = getCookies("data");
    let html = "";
    const typePaymentFormated = {
        "0": {
            "name": "Pix",
            "icon": "fa-p color--black"
        },
        "1": {
            "name": "Dinheiro",
            "icon": "fa-money-bill color--green"
        },
        "2": {
            "name": "Cartão de Débito",
            "icon": "fa-credit-card color--yellow"
        },
        "3": {
            "name": "Cartão de Crédito",
            "icon": "fa-credit-card color--blue"
        },
        "4": {
            "name": "Cartão Mumbuca",
            "icon": "fa-credit-card color--red"
        }
    }

    if (value === null) {
        return [null, 0];
    }
    
    for (let index=0; index < value.length / 11; index++) {
        let data = value.slice(index*11, (index+1)*11);

        let priceBase62 = data.slice(0, 4);
        let commissionBase62 = data.slice(4, 5);
        let typePaymentBase62 = data.slice(5, 6);
        let timeBase62 = data.slice(6, 11);

        let price = base62Decrypt(priceBase62) / 100;
        let commission = base62Decrypt(commissionBase62);
        let valueCommission = price * (commission / 100)
        let typePayment = base62Decrypt(typePaymentBase62);
        let total = price + price * (commission / 100)
        let time = base62Decrypt(timeBase62) + 1704078000;

        let dateFormated = dateFormat(time)
        let hourFormated = hourFormat(time)
    
        html = `<section class="orders__item" id="${timeBase62}"><div class="orders__item--divisor data"><span>${dateFormated}</span><span>${hourFormated}</span></div><br><br><div class="orders__item--divisor grid"><span>Subtotal</span><span class="right">$</span><span class="right">${price.toFixed(2).replace(".", ",")}</span></div><div class="orders__item--divisor grid"><span>Comissão</span><span class="right">$</span><span class="right">${valueCommission.toFixed(2).replace(".", ",")}</span></div><div class="orders__item--divisor grid"><span>Total</span><span class="right">$</span><span class="right">${total.toFixed(2).replace(".", ",")}</span></div><br><div class="orders__item--divisor payment"><section><i class="fa-solid ${typePaymentFormated[typePayment]["icon"]} icon"></i><span>Pagamento no ${typePaymentFormated[typePayment]["name"]}</span></section><section><i class="fa-solid fa-trash color--black icon trash" data-id="${timeBase62}"></i></section></div></section>` + html;}

    return [html, Math.floor(value.length / 11)];
}

function createOrder(price, commission, typePayment) {
    if (price < 147700) {
        writeCookies(price, commission, typePayment);
        loadPage("order.html");
    }
}

function initializeOrderEvents() {
    toggleNewOrderButton.forEach(element => {
        element.addEventListener("click", () => {
            toggleNewOrder();
            clearOrder();
        });
    });

    toggleNewOrderTypePayment.forEach(element => {
        element.addEventListener("click", (event) => {
            if (event.target.classList.contains('toggle-new-order__type-payment')) {
                toggleTypePayment();
            }
        });
    });

    newOrderTypePaymentItem.forEach(element => {
        element.addEventListener("click", () => {
            data = element.getAttribute("data-value");
            selectedTypePayment(data);
            toggleTypePayment();
        });
    });

    newOrderKeyboardKey.forEach(element => {
        element.addEventListener("click", () => {
            let key = element.getAttribute("data-value");
            if (key) {
                newValue(key);
                showVisor();
            }
        });
    });

    submitButton.addEventListener("click", () => {
        if (value == 0) {
            return 0;
        }
        value = value / 100;
        commission = (commissionCheck.checked) ? 10 : 0;
        createOrder(value, commission, typePayment);
        toggleNewOrder();
        clearOrder();
    });

    trash.forEach((element) => {
        element.addEventListener("click", () => {
            let id = element.getAttribute("data-id");
            dataBase62 = getCookies("data");

            for (let index=0; index < dataBase62.length / 11; index++) {
                let data = dataBase62.slice(index*11, (index+1)*11);
                let timeBase62 = data.slice(6, 11);

                if (id == timeBase62) {
                    newData = dataBase62.replace(data, ""); 
                    break;
                }
            }

            let date = new Date();
            date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + date.toUTCString();

            if (confirm("Deseja Mesmo Apagar?")) {
                document.getElementById(id).remove();
                document.cookie = "data=" + newData + "; " + expires + "; path=/";
                if (newData == "") {
                    removeCookies("data");
                }
                loadPage("order.html");
            }
        });
    });
}
