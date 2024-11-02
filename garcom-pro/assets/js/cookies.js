// Functions
function getCookies(name) {
    name = name + "=";
    let cookies = document.cookie.split(';');

    for (let i=0; i < cookies.length; i++) {
        let c = cookies[i].trim();

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return null;
}

function writeCookies(price, commission, typePayment) {
    const lastValue = getCookies("data") || "";

    const date = new Date();
    const timeInSeconds = Math.floor(date.getTime() / 1000) - 1704078000;       // Unix Time  -  2024/1/1 
    const expirationDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

    var value = "";

    for (let index in price) {
        const encodedValues = [
            base62Encrypt(Math.round(price[index] * 100), "price"),
            base62Encrypt(commission[index]),
            base62Encrypt(typePayment[index]),
        ].join('');
        value += encodedValues;
    }
    
    value += base62Encrypt(timeInSeconds, "time")
    document.cookie = `data=${lastValue + value + "#"}; expires=${expirationDate.toUTCString()}; path=/`;
}


function removeCookies(name, path="/") {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}