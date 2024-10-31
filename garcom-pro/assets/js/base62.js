// Const
const DICT = "0123456789abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


// Functions
function base62Encrypt(value, type = null) {
    let encryptValue = "";

    if (value === 0) {
        encryptValue = "0";
    } else {
        while (value !== 0) {
            encryptValue += DICT[value % 62];
            value = Math.floor(value / 62);
        }
    }

    const requiredLength = type === "price" ? 4 : type === "time" ? 5 : encryptValue.length;
    encryptValue = encryptValue.padEnd(requiredLength, "0");

    return encryptValue.split('').reverse().join('');
}

function base62Decrypt(value) {
    let result = 0;
    const reversedValue = value.split('').reverse().join('');

    for (let index in value) {
        result += DICT.indexOf(reversedValue[index]) * 62**index;
    }

    return result;
}