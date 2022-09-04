let block = 0;

let numbers = [];
let squares = [];
let arrows = [];
let operators = [];

let selected_operators = [];
let selected_numbers = [];


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function create_data() {
    selected_numbers = [];
    selected_operators = [];

    for (index = 0; index < difficulty_id + 2; index++) {
        selected_numbers.push(0);
    }

    for (index = 0; index < 4; index++) {
        selected_operators.push(0);
    }
}


function create_table() {
    html = `<div class="center"><img src="images/arrow.png" class="arrow reverse" id="arrow_0" onclick="select('arrow_0')"></div>`;
    qnt_squares = difficulty_id + 2 

    for (let index = 0; index < qnt_squares; index++) {
        html += `<div class="square" id="number_${index}" onclick="select('number_${index}')">${numbers_list[index]}</div>`;

        if (index != qnt_squares - 1) {
            html += `<div class="square" id="square_${index}" onclick="select('square_${index}')">${operators_list[index]}</div>`;
        } 
    }

    html += `<div class="center"><img src="images/arrow.png" class="arrow" onclick="select('arrow_1')"></div>`;

    document.querySelector("#table").innerHTML = html;


    html = '';
    operators = ["+", "-", "x", "/"];

    for (let index = 0; index < 4; index++) {
        html += `<div class="center"><div class="square" id="operator_${index}" onclick="select('operator_${index}')">${operators[index]}</div></div>`;
    }

    document.querySelector("#operators").innerHTML = html;

    numbers = [];
    squares = [];
    arrows = []
    operators = [];


    for (let index = 0; index < difficulty_id + 2; index++) {
        numbers.push("number_" + index);

        if (index < difficulty_id + 1) {
            squares.push("square_" + index);
        }
    }

    for (let index = 0; index < 4; index++) {
        operators.push("operator_" + index);

        if (index < 2) {
            arrows.push("arrow_" + index);
        }
    }
}


async function arrow(id) {
    if (id == "arrow_0") {
        value = numbers_list[0];

        numbers_list.shift();
        numbers_list.push(value);

        document.getElementById("table").style.animation = "shake_left 0.5s";
    }

    else {
        

        value = numbers_list[numbers_list.length - 1];

        numbers_list.pop();
        numbers_list.unshift(value);
        document.getElementById("table").style.animation = "shake_right 0.5s";
    }
    
    create_data();
    selected_operators = [0, 0, 0, 0];
    create_table(difficulty_id, numbers_list, operators_list);
    await sleep(500);
    document.getElementById("table").style.animation = "none";
}


function operator(id) {
    index = operators.indexOf(id);

    if (selected_operators[index] == 0) {
        for (index_two in selected_operators) {
            if (selected_operators[index_two] == 1) {
                document.getElementById(operators[index_two]).style.animation = "unselect 0.35s forwards";
            }
        }

        document.getElementById(id).style.animation = "select 0.35s forwards";
        selected_operators = [0, 0, 0, 0];
        selected_operators[index] = 1;
    }

    else {
        document.getElementById(id).style.animation = "unselect 0.35s forwards";
        selected_operators = [0, 0, 0, 0];
    }
}


function square(id) {
    continue_bool = 1;

    for (index in selected_operators) {
        if (selected_operators[index] == 1) {
            continue_bool = 0; 

            operator(operators[index]);
            selected_operators = [0, 0, 0, 0];

            document.getElementById(id).innerHTML = operators_symbols[index];
            operators_list[squares.indexOf(id)] = operators_symbols[index];
        }
    }

    if (continue_bool == 1) {
        document.getElementById(id).innerHTML = "";
        operators_list[squares.indexOf(id)] = "";
    }


}


function number(id) {
    continue_bool = 1;

    for (index in selected_numbers) {
        if (selected_numbers[index] == 1) {
            if (numbers[index] != id) {
                continue_bool = 0;

                num_one = numbers_list[index];
                num_two = numbers_list[numbers.indexOf(id)];

                numbers_list[index] = num_two;
                numbers_list[numbers.indexOf(id)] = num_one;

                selected_numbers[numbers.indexOf(numbers[index])] = 0;
                document.getElementById(numbers[index]).style.border = "rgb(0, 0, 0) 2px solid";

                create_table();
            }

            else {
                continue_bool = 0;
    
                selected_numbers[numbers.indexOf(id)] = 0;
                document.getElementById(id).style.border = "rgb(0, 0, 0) 2px solid";
            }
        }
    }

    if (continue_bool == 1) {
        selected_numbers[numbers.indexOf(id)] = 1;
        document.getElementById(id).style.border = "rgb(50, 30, 5) 2px solid";
    }
}


function select(id) {
    if (block == 0) {
        if (arrows.indexOf(id) != -1) {
            arrow(id);
        }

        else if (operators.indexOf(id) != -1) {
            operator(id);
        }
        
        else if (squares.indexOf(id) != -1) {
            square(id);
        }

        else if (numbers.indexOf(id) != -1) {
            number(id);
        }

        else if (id == 0) {
            checking();
        }
    }
}


async function checking() {
    continue_bool = 1;

    for (value of operators_list) {
        if (value == "") {
            continue_bool = 0;
        }
    }


    if (continue_bool == 1) {
        new_list = [];  // NEW LIST INTEGRATING NUMBERS AND OPERATORS

        for (index = 0; index < difficulty_id + 2; index++) {
            new_list.push(numbers_list[index]);

            if (index < difficulty_id + 1) {
                new_list.push(operators_list[index]);
            }
        }
    
        
        // CALCULATE LIST
        value = calculator(new_list)


        // TEST RESULT AND CALCULATE LIST
        if (value == result) {
            for (index = 0; index < difficulty_id + 2; index++) {
                document.getElementById(`number_${index}`).style.border = "rgb(0, 255, 0) 2px solid"; 
                
                if (index < difficulty_id + 1) {
                    document.getElementById(`square_${index}`).style.border = "rgb(0, 255, 0) 2px solid"
                }
            }

            document.querySelector("body").style.cursor = "progress";
            block = 1;
            await sleep(2000);
            block = 0;
            document.querySelector("body").style.cursor = "default";

            generator();
        }

        else {
            document.getElementById("table").style.animation = "shake 0.5s";

            for (repeat = 0; repeat < 2; repeat++) {
                for (index = 0; index < difficulty_id + 2; index++) {
                    document.getElementById(`number_${index}`).style.border = "rgb(255, 0, 0) 2px solid"; 
                    
                    if (index < difficulty_id + 1) {
                        document.getElementById(`square_${index}`).style.border = "rgb(255, 0, 0) 2px solid"
                    }
                }

                await sleep(125);

                for (index = 0; index < difficulty_id + 2; index++) {
                    document.getElementById(`number_${index}`).style.border = "rgb(0, 0, 0) 2px solid"; 
                    
                    if (index < difficulty_id + 1) {
                        document.getElementById(`square_${index}`).style.border = "rgb(0, 0, 0) 2px solid"
                    }
                }

                await sleep(125);
            }

            document.getElementById("table").style.animation = "none";
        }
    }

    else {
        document.getElementById("table").style.animation = "shake 0.5s";
        await sleep(500);
        document.getElementById("table").style.animation = "none";
    }
}