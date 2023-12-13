var notas = [0, 0, 0, 0, 0, 0, 0];
const ch = [40, 60, 40, 60, 40, 40, 60];

document.addEventListener("keyup", function() {
    elements = document.getElementsByClassName("opt");
    
    for (let index=0; index<7; index++) {
        notas[index] = parseFloat(document.getElementById(elements[index].id).value);
    }

    let nota = 0;
    let sum = 0;
    let div = 0;

    for (let index=0; index<7; index++) {
        if (notas[index] >= 0) { 
            sum += notas[index] * ch[index];
            div += ch[index];
        }
    }

    nota = sum / div;

    if (nota >= 0) {
        document.getElementById("result").innerHTML = nota.toFixed(2);
    } else {
        document.getElementById("result").innerHTML = 0;
    }
});