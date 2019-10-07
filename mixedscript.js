function chooseOperation(){
	return Math.floor(Math.random() * 4);
}

function getRandom(){
	return Math.floor(Math.random() * 13);
}

var firstNum = getRandom();
var secondNum = getRandom();
var realAnswer;
var symbol = document.getElementById("symbol");
var title = document.getElementById("title");
var operation = chooseOperation();
var message = document.getElementById("message");

function setupAddition(){
	realAnswer = firstNum + secondNum;
	symbol.innerHTML = "+";
	title.innerHTML = "What is the sum of:";
	document.getElementById("firstdigit").innerHTML = firstNum;
	document.getElementById("seconddigit").innerHTML = secondNum;
}

function setupSubtraction(){
	realAnswer = firstNum - secondNum;
	symbol.innerHTML = "-";
	title.innerHTML = "What is the difference of:";
	document.getElementById("firstdigit").innerHTML = firstNum;
	document.getElementById("seconddigit").innerHTML = secondNum;
}

function setupMultiplication(){
	realAnswer = firstNum * secondNum;
	symbol.innerHTML = "x";
	title.innerHTML = "What is the product of:";
	document.getElementById("firstdigit").innerHTML = firstNum;
	document.getElementById("seconddigit").innerHTML = secondNum;
}

function setupDivision(){
	var dividend = firstNum * secondNum;
	realAnswer = firstNum;
	symbol.innerHTML = "&#247;";
	title.innerHTML = "What is the quotient of:";
	document.getElementById("firstdigit").innerHTML = dividend;
	document.getElementById("seconddigit").innerHTML = secondNum;
}

switch(operation){
	case 0:
		setupAddition();
		break;
	case 1:
		setupSubtraction();
		break;
	case 2:
		setupMultiplication();
		break;
	case 3:
		setupDivision();
		break;
}

function checkAnswer(){
	var yourAnswer = document.getElementById("answer").value;
	if(realAnswer == yourAnswer){
		message.innerHTML = "Correct! Good job!";
	} else {
		message.innerHTML = "Incorrect. Please try again.";
	}
	document.getElementById("answer").value = "";
}

function checkKey(){
	if(event.key == "Enter"){
		checkAnswer();
	}
}