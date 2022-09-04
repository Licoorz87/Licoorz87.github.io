let copy_list;
let numbers_list;
let operators_list;
let operators_symbols = ["+", "-", "x", "/"];
let result;


function random_numbers(value) {
    list = [];

    for (let index = 0; index < value; index++) {
        if (value < 5) {
            list.push(Math.floor(Math.random() * 10) % 8 + 1);
        } else {
            list.push(Math.floor(Math.random() * 100) % 8 + 6);
        }

        if (index != value-1) {
            list.push( operators_symbols[Math.floor( Math.random() * 3 )] );
        }
    }

    return list;
}


function calculator(list) {
    while (list.length > 1) {
        for (const [index, item] of list.entries()) {

            if (list.indexOf("x") > -1 || list.indexOf("/") > -1) {
                if (item == "x") {
                    num = list[index-1] * list[index+1];

                    list.splice(index-1, 3, num);
                    break;
                } 
                
                else if (item == "/") {
                    if (list[index+1] == 0) {return 0.1;}
                    num = list[index-1] / list[index+1];

                    list.splice(index-1, 3, num);
                    break;
                }

            } else {
                if (item == "+") {
                    num = list[index-1] + list[index+1];

                    list.splice(index-1, 3, num);
                    break;
                }

                else if (item == "-") {
                    num = list[index-1] - list[index+1];

                    list.splice(index-1, 3, num);
                    break;
                }
            }
        }
    }

    return list[0];
}


function checker(value) {
    if (Number.isInteger(value) && value > 0 && value < 500000) {
        return true;
    } 

    len = toString(value).length;
    
    if (toString(value).slice(len-2, len-1) == ".0") {
        if (parseInt(value) > 0 && parseInt(value) < 500000) {
            return true;
        }
    }

    else {
        return false;
    }
}


function generator() {
    // Generate List
    if (block == 0) {
        while (1 == 1) {
            list = random_numbers(difficulty_id + 2);
            copy_list = [...list];
            result = calculator(list);
            check = checker(result);

            if (check == true) {
                numbers_list = [];

                for (index in copy_list) {

                    if (index % 2 == 0) {
                        numbers_list.push(copy_list[index]);
                    }
                }

                operators_list = []

                for (let i = 0; i < difficulty_id + 1; i++) {
                    operators_list.push("");
                }

                break
            }
        }

        copy_list = [];

        document.getElementById("value").innerHTML = result;

        create_data();

        // Generate Table
        create_table();
    }
}