// Const
const orderElements = {};

const typesPayment = [
    "pix", "money", "debit",
    "credit", "mumbuca", "voucher"
]
const typePaymentFormated = [
    {
        "name": "Pix",
        "icon": "fa-brands fa-pix color--aqua-marine"
    },
    {
        "name": "Dinheiro",
        "icon": "fa-solid fa-money-bill color--green"
    },
    {
        "name": "Cartão de Débito",
        "icon": "fa-brands fa-cc-mastercard color--yellow"
    },
    {
        "name": "Cartão de Crédito",
        "icon": "fa-brands fa-cc-mastercard color--blue"
    },
    {
        "name": "Cartão Mumbuca",
        "icon": "fa-solid fa-credit-card color--red"
    },
    {
        "name": "Voucher",
        "icon": "fa-solid fa-credit-card color--pink"
    }
];

var price = [0];
var commission = [10];
var typePayment = [0];


// Functions
function initializeOrderElements() {
    orderElements.newOrder = document.querySelector(".new-order");
    orderElements.toggleNewOrderButton = document.querySelectorAll(".toggle-new-order__button");
    orderElements.toggleNewOrderTypePayment = document.querySelectorAll(".toggle-new-order__type-payment");
    orderElements.newOrderTypePaymentShowBool = false;
    orderElements.newOrderTypePaymentBg = document.querySelector(".new-order__type-payment--bg");
    orderElements.newOrderTypePaymentItem = document.querySelectorAll(".new-order__type-payment--item");
    orderElements.newOrderTypePaymentSelectSpan = document.querySelector(".new-order__type-payment--select-span");
    orderElements.newOrderShowBool = false;
    orderElements.commissionCheck = document.querySelector("#commission");
    orderElements.newOrderKeyboardKey = document.querySelectorAll(".new-order__keyboard--key");
    orderElements.newOrderPayments = document.querySelector(".new-order__types-payment");
    orderElements.newOrderVisorValue = document.querySelector(".new-order__visor--value");
    orderElements.addPaymentButton = document.querySelector("#new-order__add-payment");
    orderElements.submitButton = document.querySelector("#new-order__submit");
    orderElements.trash = document.querySelectorAll(".trash");
}

function clearOrder(type, ms=0) {
    setTimeout(() => {
        orderElements.commissionCheck.checked = false;
        if (type == "add") {
            price.push(0);
            commission.push(10);
            typePayment.push(0);
        } else {
            price = [0];
            commission = [10];
            typePayment = [0];
            orderElements.newOrderPayments.innerHTML = "";
        }
        showVisor();
        selectedTypePayment("pix");
    }, ms);
}

function toggleNewOrder() {
    if (orderElements.newOrderShowBool) {
        orderElements.newOrder.style.left = "100%";
        orderElements.newOrderShowBool = false;
    } else {
        orderElements.newOrder.style.left = 0;
        orderElements.newOrderShowBool = true;
    }
}

function toggleTypePayment() {
    if (orderElements.newOrderTypePaymentShowBool) {
        orderElements.newOrderTypePaymentBg.style.display = "none";
        orderElements.newOrderTypePaymentShowBool = false;
    } else {
        orderElements.newOrderTypePaymentBg.style.display = "block";
        orderElements.newOrderTypePaymentShowBool = true;
    }
}

function showVisor() {
    orderElements.newOrderVisorValue.innerHTML = (price[price.length - 1] / 100).toFixed(2);
}

function newValue(key) {
    if (key == "del") {
        price[price.length - 1] = Math.floor(price[price.length - 1] / 10);
    } else {
        price[price.length - 1] = (price[price.length - 1] * 10) + parseInt(key);
    }
}

function selectedTypePayment(type) {
    let index = typesPayment.indexOf(type);
    let html = `<i class="${typePaymentFormated[index]["icon"]}"></i> ${typePaymentFormated[index]["name"]}`;
    
    orderElements.newOrderTypePaymentSelectSpan.innerHTML = html;
    typePayment[typePayment.length - 1] = index;
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
    let data = getCookies("data");

    if (data == null) {
        return [null, 0];
    }

    let dataSplit = data.split("#");
    let html = "";
    let numberOrders = 0;

    for (let segment of dataSplit) {
        if (segment) {
            numberOrders += 1;
            let loadPrice = [];
            let loadCommission = [];
            let loadTypePayment = [];
            let loadValueCommission = [];

            for (let index=0; index < (segment.length-5)/6; index++) {
                let minisegment = segment.slice(index*6, (index+1)*6);

                let priceBase62 = minisegment.slice(0, 4);
                let commissionBase62 = minisegment.slice(4, 5);
                let typePaymentBase62 = minisegment.slice(5, 6);

                loadPrice.push(base62Decrypt(priceBase62) / 100);
                loadCommission.push(base62Decrypt(commissionBase62));
                loadValueCommission.push(Math.floor(price * (1 - commission / 100) * 100) / 100);
                loadTypePayment.push(base62Decrypt(typePaymentBase62));
            }

            let timeBase62 = segment.slice(-5);
            let time = base62Decrypt(timeBase62) + 1704078000;
            let dateFormated = dateFormat(time)
            let hourFormated = hourFormat(time)

            let total = loadPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            let totalCommission = 0;
            let subTotal = 0;

            for (let index=0; index<loadPrice.length; index++) {
                totalCommission += loadPrice[index] - loadPrice[index] * 10 / 11;
                subTotal += loadCommission[index] == 10 ? loadPrice[index] * 10 / 11 : 0;
            }

            minihtml = `<section class="orders__item" id="${timeBase62}"><div class="orders__item--divisor data"><span>${dateFormated}</span><span>${hourFormated}</span></div><br><br><div class="orders__item--divisor grid"><span>Subtotal</span><span class="right">$</span><span class="right">${(Math.floor(subTotal * 100) / 100).toFixed(2).replace(".", ",")}</span></div><div class="orders__item--divisor grid"><span>Comissão</span><span class="right">$</span><span class="right">${(Math.floor(totalCommission * 100) / 100).toFixed(2).replace(".", ",")}</span></div><div class="orders__item--divisor grid"><span>Total</span><span class="right">$</span><span class="right">${(Math.floor(total * 100) / 100).toFixed(2).replace(".", ",")}</span></div><br><div class="orders__item--divisor payment"><section>`;
            
            for (let index in loadTypePayment) {
                minihtml += `<i class="${typePaymentFormated[loadTypePayment[index]]["icon"]} icon"></i><span>$${loadPrice[index].toFixed(2).replace(".", ",")}</span>`
            }
            
            minihtml += `</section><section><i class="fa-solid fa-trash color--black icon trash" data-id="${timeBase62}"></i></section></div></section>`;

            html = minihtml + html;
        }
    }

    return [html, numberOrders];
}

function createOrder(price, commission, typePayment) {
    writeCookies(price, commission, typePayment);
    loadPage("order.html");
}

function initializeOrderEvents() {
        orderElements.toggleNewOrderButton.forEach(element => {
        element.addEventListener("click", () => {
            toggleNewOrder();
            clearOrder("exit", 400);
        });
    });

    orderElements.toggleNewOrderTypePayment.forEach(element => {
        element.addEventListener("click", (event) => {
            if (event.target.classList.contains('toggle-new-order__type-payment')) {
                toggleTypePayment();
            }
        });
    });
    
    orderElements.newOrderTypePaymentItem.forEach(element => {
        element.addEventListener("click", () => {
            data = element.getAttribute("data-value");
            selectedTypePayment(data);
            toggleTypePayment();
        });
    });
    
    orderElements.newOrderKeyboardKey.forEach(element => {
        element.addEventListener("click", () => {
            let key = element.getAttribute("data-value");
            if (key) {
                newValue(key);
                showVisor();
            }
        });
    });
    
    orderElements.addPaymentButton.addEventListener("click", () => {
        if (price[price.length - 1] == 0) {
            return 0;
        }
        price[price.length - 1] = price[price.length - 1] / 100;
        commission[commission.length - 1] = (orderElements.commissionCheck.checked) ? 0 : 10;
        html = orderElements.newOrderPayments.innerHTML;
        html += `<div class="new-order__types-payment--item"><i class="${typePaymentFormated[typePayment[typePayment.length - 1]]["icon"]}"></i> ${price[price.length - 1].toFixed(2).replace(".", ",")}</div>`;
        orderElements.newOrderPayments.innerHTML = html;
        clearOrder("add", 0);
    });
    
    orderElements.submitButton.addEventListener("click", () => {
        if (price[price.length - 1] == 0 && price.length == 1) {
            return 0;
        }
        
        if (price[price.length - 1] == 0) {
            price.pop(-1);
            commission.pop(-1);
            typePayment.pop(-1);
        } else {
            price[price.length - 1] = price[price.length - 1] / 100;
        }
        commission[commission.length - 1] = (orderElements.commissionCheck.checked) ? 0 : 10;
        createOrder(price, commission, typePayment);
        toggleNewOrder();
        clearOrder("submit", 400);
    });

    orderElements.trash.forEach((element) => {
        element.addEventListener("click", () => {
            let id = element.getAttribute("data-id");
            let data = getCookies("data");
            let dataSplit = data.split("#");

            for (let segment of dataSplit) {
                let timeBase62 = segment.slice(-5);

                if (id == timeBase62) {
                    newData = data.replace(segment+"#", ""); 
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