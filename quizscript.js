var firstDigit = document.getElementById("firstdigit");
var secondDigit = document.getElementById("seconddigit");
var symbol = document.getElementById("symbol");
var realAnswer;
var firstNum;
var secondNum;
var timerValue;
var timerId;
var timerText = document.getElementById("progressText");
var progressBar = document.getElementById("currentProgress");
var answerBox = document.getElementById("answer");
var questionCount = 0;

function getRandom(size){
	var digit = Math.floor(Math.random() * size);
	return digit;
}

function chooseOperation(){
	var operation = getRandom(4);
	return operation;
}

function setupQuestion(){
	questionCount++;
	if(questionCount > 25){
		endQuiz();
		return;
	}
	var chosenOperation = chooseOperation();
	firstNum = getRandom(13);
	secondNum = getRandom(13);
	switch(chosenOperation){
		case 0:
			symbol.innerHTML = "+";
			realAnswer = firstNum + secondNum;
			firstDigit.innerHTML = firstNum;
			secondDigit.innerHTML = secondNum;
			break;
		case 1:
			symbol.innerHTML = "-";
			realAnswer = firstNum - secondNum;
			firstDigit.innerHTML = firstNum;
			secondDigit.innerHTML = secondNum;
			break;
		case 2:
			symbol.innerHTML = "x";
			realAnswer = firstNum * secondNum;
			firstDigit.innerHTML = firstNum;
			secondDigit.innerHTML = secondNum;
			break;
		case 3:
			symbol.innerHTML = "&#247;";
			var dividend = firstNum * secondNum;
			realAnswer = firstNum;
			firstDigit.innerHTML = dividend;
			secondDigit.innerHTML = secondNum;
			break;
	}
	timerValue = 15;
	timerText.style.width = "100%";
	timerId = setInterval(checkTimer, 100);
	answerBox.value = "";
}

var resultsArray = [];

function submitAnswer(){
	clearInterval(timerId);
	var playerAnswer = answerBox.value;
	if(playerAnswer == realAnswer){
		resultsArray.push("correct");
	} else if(playerAnswer != realAnswer){
		resultsArray.push("incorrect")
	}
	setupQuestion();
}

function checkTimer(){
	timerValue = timerValue - 0.1;
	timerText.innerHTML = Math.ceil(timerValue) + " seconds";
	var progressPercentage = 100 * timerValue / 15;
	progressBar.style.width = progressPercentage + "%";
	if(timerValue <= 0){
		resultsArray.push("unanswered");
		clearInterval(timerId);
		setupQuestion();
	}
}	

function runQuiz(){
	alert("This quiz is timed. The quiz will begin once you click OK.");
	setupQuestion();
}

function endQuiz(){
	var correctCount = 0;
	for(var i = 0; i < resultsArray.length; i++){
		if(resultsArray[i] == "correct"){
			correctCount++;
		}
	}
	var results = correctCount + " out of 25";
	progressBar.style.width = "100%";
	timerText.innerHTML = "Quiz complete. Your results were " + results + "!" + ' <a href = "quiz.html">Play again</a>';
}

function checkKey(){
	if(event.key == "Enter"){
		submitAnswer();
	}
}