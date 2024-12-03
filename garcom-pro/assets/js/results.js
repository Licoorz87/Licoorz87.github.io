// Const
const resultsElements = {};

// Functions
function initializeResultsElements() {
    resultsElements.resultsOrders = {};
    resultsElements.resultsContent = {
        "numOrders": 0,
        "price": 0,
        "commission": 0,
        "typePayment": {
            "pix": {
                "color": "#37beb0",
                "quantity": 0,
                "price": 0
            },
            "money": {
                "color": "green",
                "quantity": 0,
                "price": 0
            },
            "debit": {
                "color": "rgb(255, 174, 0)",
                "quantity": 0,
                "price": 0
            },
            "credit": {
                "color": "blue",
                "quantity": 0,
                "price": 0
            },
            "mumbuca": {
                "color": "red",
                "quantity": 0,
                "price": 0
            },
            "voucher": {
                "color": "rgb(255, 134, 154)",
                "quantity": 0,
                "price": 0
            }
        }
    };
    resultsElements.timestamp = {
        "start": 0,
        "end": 0
    }
    resultsElements.numPageOrder = 0;
    resultsElements.entryOrders = document.querySelector(".results__entryOrders");
    resultsElements.entryOrdersButton = document.querySelector('.results__entryOrders--button');
    resultsElements.ordersInput = document.querySelector("#results__input-files");
    resultsElements.results = document.querySelector(".results");
    resultsElements.calendarBox = document.querySelector(".results__calendar--box");
    resultsElements.calendarSpan = document.querySelector(".results__calendar--span");
    resultsElements.popUpDatetime = document.querySelector(".pop-up__datetime");
    resultsElements.toggleDatetimeButton = document.querySelectorAll(".toggle-datetime__button");
    resultsElements.showDatetimeBool = false;
    resultsElements.totalOrder = document.querySelector("#results__totalOrder");
    resultsElements.totalPrice = document.querySelector("#results__totalPrice");
    resultsElements.totalCommission = document.querySelector("#results__totalCommission");
    resultsElements.paymentGraphic = document.querySelector(".results__paymentStatistic--graphic");
    resultsElements.ordersTable = document.querySelector(".results__orders--table");
    resultsElements.ordersTableSpan = document.querySelector(".results__orders--pagination--span");
    resultsElements.ordersTableLeftIcon = document.querySelector(".results__orders--pagination--button.left");
    resultsElements.ordersTableRightIcon = document.querySelector(".results__orders--pagination--button.right");
    resultsElements.orders = [];
}

function loadContent() {
    let timestampTemp = {
        "start": 0,
        "end": 0
    }

    for (key in resultsElements.resultsOrders) {
        let data = JSON.parse(resultsElements.resultsOrders[key])["data"];
        
        for (let index=0; index<data.length; index++) {
            let subdata = data[index];
            let subprice = 0;
            let subcommission = 0;
            resultsElements.resultsContent.numOrders += 1;
            
            if ((resultsElements.timestamp.start < subdata.time && subdata.time < resultsElements.timestamp.end) || resultsElements.timestamp.end == 0) {
                for (let i=0; i<subdata.price.length; i++) {
                    resultsElements.resultsContent.price += subdata.price[i];
                    subprice += subdata.price[i];
                    resultsElements.resultsContent.commission += subdata.price[i] / (subdata.commission[i] + 1);
                    subcommission += subdata.price[i] / (subdata.commission[i] + 1);
                    resultsElements.resultsContent.typePayment[typesPayment[subdata.typePayment[i]]].quantity += 1;
                    resultsElements.resultsContent.typePayment[typesPayment[subdata.typePayment[i]]].price += subdata.price[i];
                }
            }

            resultsElements.orders.push(subdata);

            if (timestampTemp.start == 0 || timestampTemp.start > subdata.time) {
                timestampTemp.start = subdata.time;
            } if (timestampTemp.end == 0 || timestampTemp.end < subdata.time) {
                timestampTemp.end = subdata.time;
            }
        }
    }

    resultsElements.orders.sort((a, b) => b.time - a.time);

    if (resultsElements.timestamp.start == 0 || resultsElements.timestamp.end == 0) {
        resultsElements.timestamp = timestampTemp;
    }

    // Calendar
    let calendarStart = dateFormat(resultsElements.timestamp.start);
    let calendarEnd = dateFormat(resultsElements.timestamp.end);
    resultsElements.calendarSpan.innerHTML = `${calendarStart["day"]} ${calendarStart["month"]} - ${calendarEnd["day"]} ${calendarEnd["month"]}`;

    // Dashboard
    resultsElements.totalOrder.innerHTML = `${resultsElements.resultsContent.numOrders}`;
    resultsElements.totalPrice.innerHTML = `R$ ${correctValue(resultsElements.resultsContent.price)}`;
    resultsElements.totalCommission.innerHTML = `R$ ${correctValue(resultsElements.resultsContent.commission)}`;
    
    // Type Payments
    let content = "conic-gradient(";
    let deg = 0;
    for (typePayment in resultsElements.resultsContent.typePayment) {
        new_deg = Math.round(resultsElements.resultsContent.typePayment[typePayment]["price"] / resultsElements.resultsContent.price * 360 + deg, 2);
        content += `${resultsElements.resultsContent.typePayment[typePayment]["color"]} ${deg}deg ${new_deg}deg, `;

        deg = new_deg;
    }
    content = content.slice(0, -2) + ")";
    resultsElements.paymentGraphic.style.background = content;

    // Orders
    loadOrdersTable(0)
}

function loadOrdersTable() {
    resultsElements.ordersTable.innerHTML = `<tr class="results__orders--header"><th class="results__orders--header--item">Order</th><th class="results__orders--header--item">Data</th><th class="results__orders--header--item">Hora</th><th class="results__orders--header--item">Subtotal</th><th class="results__orders--header--item">Comissão</th><th class="results__orders--header--item">Total</th></tr>`;

    for (let i=0; i<15 && 15*resultsElements.numPageOrder+i<resultsElements.orders.length; i++) {
        let subdata = resultsElements.orders[15 * resultsElements.numPageOrder + i];
        let subprice = 0;
        let commission = 0;
        let price = 0;
        
        for (index in subdata.price) {
            price += subdata.price[index];
            commission += subdata.price[index] / (subdata.commission[index] + 1);
        }

        subprice = price - commission;
        
        let data = dateFormat(subdata.time);
        let time = hourFormat(subdata.time);
    
        let element = document.createElement("tr");
        element.classList.add("results__ordes--order");
        element.setAttribute("data-id", 15 * resultsElements.numPageOrder + i)
        element.innerHTML = `
            <td class="results__ordes--order--item">#${15 * resultsElements.numPageOrder + i + 1}</td>
            <td class="results__ordes--order--item">${data.day} ${data.month}, ${data.year}</td>
            <td class="results__ordes--order--item">${time}</td>
            <td class="results__ordes--order--item">${correctValue(subprice)}</td>
            <td class="results__ordes--order--item">${correctValue(commission)}</td>
            <td class="results__ordes--order--item">${correctValue(price)}</td>`;

        resultsElements.ordersTable.appendChild(element);
    }

    resultsElements.ordersTableLeftIcon.style.color = "rgb(54, 54, 54)";
    resultsElements.ordersTableRightIcon.style.color = "rgb(54, 54, 54)";

    if (resultsElements.numPageOrder == 0) {
        resultsElements.ordersTableLeftIcon.style.color = "rgb(199, 199, 199)";
    }
    if (resultsElements.numPageOrder == Math.ceil(resultsElements.orders.length / 15) - 1) {
        resultsElements.ordersTableRightIcon.style.color = "rgb(199, 199, 199)";
    }
    resultsElements.ordersTableSpan.innerHTML = `${resultsElements.numPageOrder+1} de ${Math.ceil(resultsElements.orders.length / 15)}`;
}

// Events
function initializeResultsEvents() {
    resultsElements.entryOrdersButton.addEventListener("click", () => {
        resultsElements.ordersInput.click();
    });

    resultsElements.ordersInput.addEventListener('change', async (event) => {
        const files = event.target.files;
    
        for (const file of files) {
            if (file.name.indexOf(".gpro") >= 0) {
                filename = file.name;
                resultsElements.resultsOrders[`${filename}`] = await file.text();
            }
        }

        resultsElements.entryOrders.style.display = "none";
        resultsElements.results.style.display = "flex";

        loadContent();
    });

    resultsElements.toggleDatetimeButton.forEach(element => {
        element.addEventListener("click", () => {
            if (resultsElements.showDatetimeBool) {
                resultsElements.popUpDatetime.style.left = "100%";
                resultsElements.showDatetimeBool = false;
            } else {
                resultsElements.popUpDatetime.style.left = "0%";
                resultsElements.showDatetimeBool = true;
            }
        });
    });

    resultsElements.ordersTableLeftIcon.addEventListener("click", () => {
        if (resultsElements.numPageOrder == 0) {
            return 0;
        }

        resultsElements.numPageOrder -= 1;
        loadOrdersTable();
    });

    resultsElements.ordersTableRightIcon.addEventListener("click", () => {
        if (resultsElements.numPageOrder == Math.ceil(resultsElements.orders.length / 15) - 1) {
            return 0;
        }

        resultsElements.numPageOrder += 1;
        loadOrdersTable();
    });
}

