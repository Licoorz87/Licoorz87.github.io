// Const & Var
const nav = document.querySelector(".nav");
const navAction = document.querySelectorAll(".nav-action");
const toggleNavButton = document.querySelectorAll(".toggle-nav__button");
var navShowBool = false;


// Functions
function toggleNav() {
    if (navShowBool) {
        nav.style.left = "-100%";
        navShowBool = false;
    } else {
        nav.style.left = 0;
        navShowBool = true;
    }
}


// Events
toggleNavButton.forEach(element => {
    element.addEventListener("click", toggleNav);
});

navAction.forEach(element => {
    element.addEventListener("click", async () => {
        const action = element.getAttribute("data-action");

        switch (action) {
            case "order":
                loadPage("order.html");
                loadOrder();
                break;
            case "download":
                download();
                break;
            case "result":
                loadPage("result.html");
                break;
            case "delete":
                if(await confirmAlert("Deseja apagar todos os pedidos?")) {
                    removeCookies("data");
                    loadPage("order.html");
                }
                break;
        }
        toggleNav();
    });
});