let language_id = 0;
let difficulty_id = 2;


function load_game() {
    language_id = set_language();
    language_refresh(language_id);
    create_data();
}


function set_language() {
    language = navigator.language.slice(0,2);
    
    list_of_languages = ["pt", "en", "es", "zh", "ru"];
    
    language_id = list_of_languages.indexOf(language);

    if (language_id != -1) {
        return language_id
    }

    else {
        return 1;
    }
}


function language_refresh() {
    if (language_id == 0) {
        list_strings = ["JOGAR", "CONFIGURAÇÕES", "PORTUGUÊS", "VOLTAR", "VERIFICAR"];
        difficulty_strings = ["MUITO FÁCIL", "FÁCIL", "NORMAL", "DIFÍCIL", "MUITO DIFÍCIL"];
        hints_string = ["• Coloque As Operações Nos Locais Adequados Para Que A Expressão De O Resultado Sublinhado.<br><br> \
        • Clique Em Algum Operador E Após, Clique Em Alguma Casa Vazia.<br><br> \
        • Para Limpar Um Operador, Basta Clica-lo.<br><br> \
        • Clique Em Um Número Para Seleciona-lo E Clique Em Outro Número Para Troca-los De Lugar.<br><br> \
        • Clique Em Uma Das Setas Para Trocar Todos Os Números De Lugar.<br><br> \
        • Lembre-se: Multiplicação E Divisão São Feitas Primeiramente, Da Esquerda Para A Direita."];

    } else if (language_id == 1) {
        list_strings = ["PLAY", "CONFIGURATIONS", "ENGLISH", "BACK", "CHECK"];
        difficulty_strings = ["VERY EASY", "EASY", "NORMAL", "HARD", "VERY HARD"];
        hints_string = ["• Place Operations In Proper Places For The Expression Of The Result Underlined.<br><br> \
        • Click On Any Operator And After, Click On Any Empty House.<br><br> \
        • To Clear an Operator, Just Click on it.<br><br><br><br> \
        • Click On A Number To Select It And Click On Another Number To Replace Them.<br><br> \
        • Click On One Of The Arrows To Swap All Seat Numbers.<br><br> \
        • Remember: Multiplication and Division Are Done First, From Left To Right."];

    } else if (language_id == 2) {
        list_strings = ["JUGAR", "AJUSTES", "SPANISH", "REGRESAR", "COMPROBAR"];
        difficulty_strings = ["MUY FÁCIL", "FÁCIL", "NORMAL", "DIFÍCIL", "MUY DIFÍCIL"];
        hints_string = ["• Coloque las operaciones en los lugares adecuados para la expresión del resultado subrayado.<br><br> \
        • Haga clic en Cualquier operador y luego haga clic en Cualquier casa vacía.<br><br> \
        • Para borrar un operador, simplemente haga clic en él.<br><br> \
        • Haga clic en un número para seleccionarlo y haga clic en otro número para reemplazarlos.<br><br> \
        • Haga clic en una de las flechas para intercambiar todos los números de asiento.<br><br> \
        • Recuerde: la multiplicación y la división se hacen primero, de izquierda a derecha."];

    } else if (language_id == 3) {
        list_strings = ["玩", "設置", "中國人", "回來", "查看"];
        difficulty_strings = ["很容易", "簡單的", "普通的", "難的", "非常困難"];
        hints_string = ["• 將操作放置在適當的位置，以便下劃線的結果表達。<br><br> \
        • 單擊任何運算符，然後單擊任何空房子。<br><br> \
        • 要清除操作員，只需單擊它。<br><br> \
        • 單擊一個數字以選擇它，然後單擊另一個數字以替換它們。<br><br> \
        • 單擊箭頭之一以交換所有座位號。<br><br> \
        • 記住：乘法和除法是首先進行的，從左到右。"];

    } else {
        list_strings = ["ИГРАТЬ В", "НАСТРОЙКИ", "РУССКИЙ", "ВЕРНИСЬ", "ПРОВЕРЬТЕ"];
        difficulty_strings = ["ОЧЕНЬ ПРОСТО", "ЛЕГКИЙ", "ОБЫЧНЫЙ", "СЛОЖНО", "ОЧЕНЬ СЛОЖНО"];
        hints_string = ["• Разместите операции в нужных местах для выражения подчеркнутого результата.<br><br> \
        • Нажмите на любого оператора, а затем нажмите на любой пустой дом.<br><br> \
        • Чтобы очистить оператора, просто нажмите на него.<br><br> \
        • Нажмите на номер, чтобы выбрать его, и нажмите на другой номер, чтобы заменить их.<br><br> \
        • Нажмите на одну из стрелок, чтобы поменять местами все номера мест.<br><br> \
        • Помните: умножение и деление выполняются сначала слева направо."];
    }

    list_of_ids = ["play_string", "config_string", "language_string", "back_string", "checker_string"];

    for (index in list_of_ids) {
        document.getElementById(list_of_ids[index]).innerHTML = list_strings[index];
    }

    document.getElementById("difficulty_string").innerHTML = difficulty_strings[difficulty_id];
    document.getElementById("hints_string").innerHTML = hints_string;
}


function show_menu() {
    if (block == 0) {
        document.getElementById("config").style.display = "none";
        document.getElementById("menu").style.display = "block";
        document.getElementById("game").style.display = "none";
    }
}


function show_game() {
    document.getElementById("config").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";

    generator();
}


function show_config() {
    document.getElementById("config").style.display = "block";
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "none";
}


function show_hints() {
    block = 1;
    document.getElementById("hints_div").style.animation = "none";
    document.getElementById("hints_div").style.animation = "increase 0.5s forwards";
    document.getElementById("hints_div").style.display = "flex";
}


async function close_hints() {
    document.getElementById("hints_div").style.animation = "decrease 0.5s forwards";
    await sleep(500);
    block = 0;
    document.getElementById("hints_div").style.display = "none";
}


function switch_language() {
    language_id = (language_id + 1) % 5;

    language_refresh();
}


function switch_difficulty() {
    difficulty_id = (difficulty_id + 1) % 5;

    language_refresh();
    create_data();
}