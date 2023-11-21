const valideWords = [];
const chosenWords = ['ACARO', 'AGUIA', 'ARARA', 'BAGRE', 'BISAO', 'CABRA', 'CARPA', 'CERVO', 'CISNE', 'COALA', 'COBRA', 'CORVO',  'CUPIM', 'CURIO', 'CUTIA', 'FURAO', 'GAMBA', 'GANSO', 'GARÇA', 'GRILO', 'GUARA', 'HIENA', 'LARVA', 'LEBRE', 'LESMA', 'LHAMA', 'LINCE', 'MAMBA', 'MORSA', 'MOSCA', 'OCAPI', 'OSTRA', 'PANDA', 'PAVAO', 'PEIXE', 'POLVO', 'POMBO', 'PORCO', 'POTRO', 'PULGA', 'PITON', 'PONEI', 'QUATI', 'SABIA', 'SAGUI', 'SAIGA', 'TIGRE', 'TOURO', 'TRAÇA', 'TRUTA', 'URUBU', 'URUTU', 'VEADO', 'VESPA', 'XEXEU', 'ZEBRA'];
const ids = ["id0", "id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8", "id9", "id10", "id11", "id12", "id13", "id14", "id15", "id16", "id17", "id18", "id19", "id20", "id21", "id22", "id23", "id24", "id25", "id26", "id27", "id28", "id29"];
const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "delete", "enter"];
const listNumbers = [[0, 5, 10, 15, 20, 25], [1, 6, 11, 16, 21, 26], [2, 7,12, 17, 22, 27], [3, 8, 13, 18, 23, 28], [4, 9, 14, 19, 24, 29]];
const colors = ["rgb(90, 90, 90)", "rgb(163, 76, 0)", "rgb(0, 128, 0)", "rgb(62, 62, 62)"];
const darkColors = ["rgb(68, 68, 68)", "rgb(122, 57, 0)", "rgb(0, 96, 0)", "rgb(46, 46, 46)"];
const keysColor = ['rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)', 'rgb(90, 90, 90)'];
let attempt = 0;
let chosenSquare = 0;
let chooseBetween = [0, 4];
let game = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let writtenWord = [' ', ' ', ' ', ' ', ' '];
let count = 0;
let gameInAction = true;
let word;
let hits;
let listOfLetters;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function shakeLine() {
	document.getElementById("line" + attempt).style.animation = "shake 0.5s";
	await sleep(500);
    document.getElementById("line" + attempt).style.animation = "";
}

async function keyMovement(key) {
	document.getElementById("key" + keys.indexOf(key)).style.backgroundColor = darkColors[colors.indexOf(keysColor[keys.indexOf(key)])];
	document.getElementById("key" + keys.indexOf(key)).style.border = "3px solid " + darkColors[colors.indexOf(keysColor[keys.indexOf(key)])];
	document.getElementById("key"+ keys.indexOf(key)).style.boxShadow = "0px 0px 0px #333";
	await sleep(300);
	document.getElementById("key" + keys.indexOf(key)).style.backgroundColor = keysColor[keys.indexOf(key)];
	document.getElementById("key" + keys.indexOf(key)).style.border = "3px solid " + keysColor[keys.indexOf(key)];
	document.getElementById("key"+ keys.indexOf(key)).style.boxShadow = "1.5px 1.5px 3px #333";
}

function refresh() {
	for (let binary in game) {
		if (game[binary] == 1) {
			document.getElementById(ids[binary]).style.backgroundColor = "#5A5A5A";
		} else if (game[binary] == 0) {
			document.getElementById(ids[binary]).style.backgroundColor = "#5A5A5A";
		}
	}
	
	for (let id in ids) {
		document.getElementById(ids[id]).style.borderBottom = "5px solid #3E3E3E";
	}
	
	if (chosenSquare >= 0) {
		document.getElementById(ids[chosenSquare]).style.borderBottom = "5px solid #FFF";
	}
}

function newGame() {
	// escolher word entre chosenWords
	word = chosenWords[(Math.floor(Math.random() * 1000)) % chosenWords.length];
	gameInAction = true;
	attempt = 0;
	chosenSquare = 0;
	game = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	chooseBetween = [0, 4];
	writtenWord = [' ', ' ', ' ', ' ', ' '];
	refresh();
}

function select(id) {
    if (gameInAction == true) {
    	id = ids.indexOf(id);
    	if (id >= chooseBetween[0] && id <= chooseBetween[1]) {
    		chosenSquare = id;
    		refresh();
    	}
    }
}

function pressKey(key) {
    if (gameInAction == true) {
    	keyMovement(key);
    	if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].indexOf(key) >= 0) {
    		if (chosenSquare >= 0) {
    			if (["M", "W"].indexOf(key) >= 0) {
    				document.getElementById(ids[chosenSquare] + "text").style.marginLeft = "-4px";
				} else if (["I"].indexOf(key) >= 0) {
					document.getElementById(ids[chosenSquare] + "text").style.marginLeft = "8px";
				} else if (["D", "E", "F", "J", "L", "R", "S", "T", "U", "V", "Y", "Z"].indexOf(key) >= 0) {
					document.getElementById(ids[chosenSquare] + "text").style.marginLeft = "2px";
				} else {
					document.getElementById(ids[chosenSquare] + "text").style.marginLeft = "0px";
				}
				
    			document.getElementById(ids[chosenSquare]+"text").innerHTML = key;
    			
    			for (let index in listNumbers) {
    				if (listNumbers[index].indexOf(chosenSquare) >= 0){
    					writtenWord[index] = key;
    				}
    			}
    			
    			if (chosenSquare+1 >= chooseBetween[0] && chosenSquare+1 <= chooseBetween[1]) {
    				chosenSquare ++;
    				repeat = true
    				
    				while (repeat == true) {
    					for (let index in listNumbers) {
    						if (listNumbers[index].indexOf(chosenSquare) >= 0){
    							if (writtenWord[index] == " ") {
    								repeat = false;
								} else {
									chosenSquare ++;
   							 	if (chosenSquare > chooseBetween[1]) {
   									chosenSquare = -1;
										repeat = false;
									}
								}
    						}
    					}
    				}
    
    
    
    
    
    
    
    
    			} else {
    				chosenSquare = -1;
    			}
    			
    			refresh();
    		}
    	} else if (key == "enter") {
    		count = 0;
    		for (let letter of writtenWord) {
    			if (letter == " ") {
    				count ++;
    			}
    		}
    		
    		if (count == 0) {
    			if (valideWords.indexOf(writtenWord.join("")) <= 0) {
    				for (let index = chooseBetween[0]; index <= chooseBetween[1]; index++) {
    					document.getElementById(ids[index]).style.animation = "spin 0.7s";
    				}
    			
    				listOfLetters = Array.from(writtenWord);
    				lettersOfWord = Array.from(word.split(""));
    				hits = 0
    				
    				for (let index in listOfLetters) {
    					if (listOfLetters[index] == word[index]) {
    						document.getElementById("key" + keys.indexOf(listOfLetters[index])).style.backgroundColor = "#008000";
    						document.getElementById("key" + keys.indexOf(listOfLetters[index])).style.border = "3px solid #008000";
    						keysColor[keys.indexOf(listOfLetters[index])] = "rgb(0, 128, 0)";
    						document.getElementById(ids[parseInt(chooseBetween[0])+parseInt(index)]).style.backgroundColor = "#008000";
    						listOfLetters[index] = 0;
    						lettersOfWord[index] = 0;
    						hits ++;
    					}
    				}
    				
    				for (let index in listOfLetters) {
    					if (listOfLetters[index] != 0) {
    						if (lettersOfWord.indexOf(listOfLetters[index]) >= 0) {
    							document.getElementById(ids[parseInt(chooseBetween[0])+parseInt(index)]).style.backgroundColor = "#A34C00";
    							lettersOfWord[lettersOfWord.indexOf(listOfLetters[index])] = 0;
    							if (keysColor[keys.indexOf(listOfLetters[index])] != "rgb(0, 128, 0)") {
    								document.getElementById("key" + keys.indexOf(listOfLetters[index])).style.backgroundColor = "rgb(163, 76, 0)";
    								document.getElementById("key" + keys.indexOf(listOfLetters[index])).style.border = "3px solid rgb(163, 76, 0)";
    								keysColor[keys.indexOf(listOfLetters[index])] = "rgb(163, 76, 0)";
    							}
    						} else {
    							document.getElementById(ids[parseInt(chooseBetween[0])+parseInt(index)]).style.backgroundColor = "#3E3E3E";
    							if (keysColor[keys.indexOf(listOfLetters[index])] == "rgb(90, 90, 90)") {
    								document.getElementById("key" + keys.indexOf(listOfLetters[index])).style.backgroundColor = "rgb(62, 62, 62)";
    								document.getElementById("key" + keys.indexOf(listOfLetters[index])).style.border = "3px solid rgb(62, 62, 62)";
    								keysColor[keys.indexOf(listOfLetters[index])] = "rgb(62, 62, 62)";
    							}
    						}
    					}
    				}
    
    				if (hits == 5) {
    					gameInAction = false;
    					if (chosenSquare >= 0) {
							document.getElementById(ids[chosenSquare]).style.borderBottom = "5px solid #3E3E3E";
						}
    				} else {
    					for (let index = chooseBetween[0]; index <= chooseBetween[1]; index++) {
    						game[index] = 2;
    					}
    					
    					attempt ++;
    					chosenSquare = listNumbers[0][attempt];
    					chooseBetween = [listNumbers[0][attempt], listNumbers[0][attempt]+4];
    				
    					for (let index = chooseBetween[0]; index <= chooseBetween[1]; index++) {
    						game[index] = 1;
    					}
    					writtenWord = [' ', ' ', ' ', ' ', ' '];
    					refresh();
    				}
    			} else {
    				alert("invalido");
    			}
    		} else {
    			shakeLine();
    		}
    		
    		if (attempt == 6) {
    			gameInAction = false;
    			if (chosenSquare >= 0) {
					document.getElementById(ids[chosenSquare]).style.borderBottom = "5px solid #3E3E3E";
				}
				alert(word);
    		}
    	} else if (key == "delete") {
    		if (chosenSquare >= 0) {
    			for (let index in listNumbers) {
    				if (listNumbers[index].indexOf(chosenSquare) >= 0) {
    					if (writtenWord[index] == " ") {
    						if (listNumbers[0].indexOf(chosenSquare) == -1) {
    							chosenSquare -= 1;
    							writtenWord[index-1] = " ";
    							document.getElementById(ids[chosenSquare]+"text").innerHTML = "";
    							refresh();
    						}
    					} else {
    						writtenWord[index] = " ";
    						document.getElementById(ids[chosenSquare]+"text").innerHTML = "";
    					}
    				}
    			}
    		} else if (chosenSquare <= -1) {
    			chosenSquare = listNumbers[4][attempt]
    			writtenWord[4] = " ";
    			console.log(ids[chosenSquare]+"text");
    			document.getElementById(ids[chosenSquare]+"text").innerHTML = "";
    			refresh();
    		}
    	}
    }
}