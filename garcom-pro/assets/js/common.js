// Const & Var
const alertMsg = document.querySelector(".alert__msg--ctx");
const alertContainer = document.querySelector(".alert__bg");
var alertShow = false;

const alertButtonsElements = document.querySelectorAll(".alert__buttons");
var resultAlert = null;


// Functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function correctValue(value) {
    return value
        .toFixed(2)
        .replace(/\./g, ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function toggleAlert() {
    if (alertShow) {
        alertContainer.style.display = "none";
        alertShow = false;
    } else {
        alertContainer.style.display = "block";
        alertShow = true;
    }
}

async function confirmAlert(msg) {
    alertMsg.innerHTML = msg;
    toggleAlert();

    while (resultAlert === null) {
        await sleep(100);
    }

    toggleAlert();

    returnCtx = resultAlert;
    resultAlert = null;

    return returnCtx;
}

function dateFormat(timestamp) {
    let date = new Date(timestamp * 1000);

    const weeks = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    let week = weeks[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return {"day": day, "week": week, "month": month, "year": year};
}

function hourFormat(timestamp) {
    let date = new Date(timestamp * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}


// Events
alertContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains('alert__bg')) {
        resultAlert = false;
    }
});

alertButtonsElements.forEach(element => {
    element.addEventListener("click", (event) => {
        if (event.target.classList.contains("exit")) {
            resultAlert = false;
        } else {
            resultAlert = true;
        }
    });
});