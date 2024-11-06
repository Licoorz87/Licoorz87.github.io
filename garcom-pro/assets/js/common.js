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