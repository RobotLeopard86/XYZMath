var pages = [document.getElementById("settingspage"), document.getElementById("gamepage")];
var questionsToDo;
var answerBox = document.getElementById("answerBox");
var selectOperationBoxes = [document.getElementById("aselect"), document.getElementById("sselect"), document.getElementById("mselect"), document.getElementById("dselect")];
var operations = ["a", "s", "m", "d"];
var timerlengthbox = document.getElementById("timervalue");
var timerText = document.getElementById("timerText");
var timerValue;
var timerId;
var timerZone = document.getElementById("timerContents");
var questionCount = 0;
var firstNum;
var secondNum;
var realAnswer;
var min;
var max;
var timerlength;
var timeText = document.getElementById("time");
var time;
var progress = document.getElementById("completedBar");

function parseSettings(){
	usedOperations = [];
	for(var j = 0; j < selectOperationBoxes.length; j++){
		if(selectOperationBoxes[j].checked){
			usedOperations.push(operations[j]);
		}
	}
	min = parseInt(document.getElementById("min").value);
	max = parseInt(document.getElementById("max").value);
	timerlength = parseInt(timerlengthbox.value);
	questionsToDo = parseInt(document.getElementById("ques").value);
	if(usedOperations.length == 0){
		alert("You must select at least one operation.");
		return;
	}
	if(isNaN(min) || isNaN(max) || isNaN(questionsToDo) || isNaN(timerlength)){
		alert("Please enter a valid number.");
		return;
	}
	if(timerlength < 0){
		alert("Your timer cannot be less than 0.");
		return;
	}
	if(questionsToDo <= 0){
		alert("You must input a question count of 1 or above to start a round.");
		return;
	}
	if(min >= max){
		alert("Please set the minimum value to be less than the maximum value.");
		return;
	}
	if(timerlength == 0){
		if(!confirm("Timer is off for this round. Press Cancel to edit timer value.")){
			return;
		} else {
			timerZone.style.display = "none";
		}
	}
	progress.max = questionsToDo;
	pages[0].style.display = "none";
	pages[1].style.display = "block";
}

function getRandom(){
	return min + Math.floor(Math.random() * (max - min));
}

function chooseOperation(){
	 return usedOperations[Math.floor(Math.random() * usedOperations.length)];
}

function setupQuestion(){
	questionCount++;
	if(questionCount > questionsToDo){
		endRound();
		return;
	}
	var chosenOperation = chooseOperation();
	firstNum = getRandom();
	secondNum = getRandom();
	switch(chosenOperation){
		case "a":
			symbol.innerHTML = "+";
			realAnswer = firstNum + secondNum;
			firstDigit.innerHTML = firstNum;
			secondDigit.innerHTML = secondNum;
			break;
		case "s":
			symbol.innerHTML = "-";
			realAnswer = firstNum - secondNum;
			firstDigit.innerHTML = firstNum;
			secondDigit.innerHTML = secondNum;
			break;
		case "m":
			symbol.innerHTML = "x";
			realAnswer = firstNum * secondNum;
			firstDigit.innerHTML = firstNum;
			secondDigit.innerHTML = secondNum;
			break;
		case "d":
			symbol.innerHTML = "&#247;";
			var dividend = firstNum * secondNum;
			realAnswer = firstNum;
			firstDigit.innerHTML = dividend;
			secondDigit.innerHTML = secondNum;
			break;
	}
	if(timerlength != 0){
		timerValue = timerlengthbox.value;
	}
	timerId = setInterval(checkTimer, 100);
	answerBox.value = "";
}

var answers = [];

function checkTimer(){
	timerValue = timerValue - 0.1;
	timerText.innerHTML = Math.ceil(timerValue) + " seconds remaining.";
	if(timerValue <= 0){
		answers.push("unanswered");
		clearInterval(timerId);
		progress.value = progress.value + 1;
		setupQuestion();
	}
	time = time + 0.1;
	timeText.innerHTML = "Elapsed time: " + Number.parseFloat(time).toFixed(1) + " seconds.";
}

function checkAnswer(){
	var yourAnswer = answerBox.value;
	if(realAnswer == yourAnswer){
		answers.push("correct")
	} else {
		answers.push("incorrect");
	}
	clearInterval(timerId);
	progress.value = progress.value + 1;
	setupQuestion();
}

function checkKey(){
	if(event.key == "Enter"){
		checkAnswer();
	}
}

function startRound(){
	time = 0;
	setupQuestion();
}

function endRound(){
	var score = 0;
	for(var i = 0; i < answers.length; i++){
		if(answers[i] == "correct"){
			score++;
		}
	}
	alert("You got " + score + " out of " + questionsToDo + " questions correct in " + Number.parseFloat(time).toFixed(1) + " seconds. Great job!");
	window.open("menu.html", "_self");
}