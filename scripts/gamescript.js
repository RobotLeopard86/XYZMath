var pages = [document.getElementById("settingspage"), document.getElementById("gamepage"), document.getElementById("resultspage")];
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
var answerdisplay = document.getElementById("answerdisplay");
var resultsdisplay = document.getElementById("resultsdisplay");
var timerIsOn = false;
var timerOffLock = false;
var button = document.getElementById("submitButton");

function parseSettings(){
	usedOperations = [];
	for(var j = 0; j < selectOperationBoxes.length; j++){
		if(selectOperationBoxes[j].checked){
			usedOperations.push(operations[j]);
		}
	}
	min = parseInt(document.getElementById("min").value);
	max = parseInt(document.getElementById("max").value);
	timerlength = timerlengthbox.value;
	if(timerlength.length == 0){
		timerOffLock = true;
	}
	timerlength = parseInt(timerlength);
	questionsToDo = parseInt(document.getElementById("ques").value);
	if(usedOperations.length == 0){
		alert("You must select at least one operation.");
		return;
	}
	if(isNaN(min)){
		alert("Please enter a whole number at Min Value.");
		return;
	}
	if(isNaN(max)){
		alert("Please enter a whole number at Max Value.");
		return;
	}
	if(timerlength < 0 || isNaN(timerlength) && timerlength.length > 0 && timerOffLock == false){
		alert("Please enter a whole number greater than 0 at Timer Length.");
		return;
	}
	if(timerlength.length > 0 || timerlength != 0 && timerOffLock == false){
		timerIsOn = true;
	}
	if(questionsToDo <= 0 || isNaN(questionsToDo)){
		alert("Please enter a whole number greater than 0 at Question Count.");
		return;
	}
	if(min >= max){
		alert("Please set the minimum value to be less than the maximum value.");
		return;
	}
	if(timerIsOn == false){
		if(confirm("Timer is off for this round. Press Cancel to edit timer value.")){
			timerZone.style.display = "none";
		} else {
			return;
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
	answerdisplay.innerHTML = "Waiting for answer...";
	if(questionCount >= questionsToDo){
		endRound();
		return;
	}
	questionCount++;
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
			if(realAnswer < 0){
				questionCount--;
				clearInterval(timerId);
				setupQuestion();
			}
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
			if(secondNum == 0){
				questionCount--;
				clearInterval(timerId);
				setupQuestion()
			} else {
				firstDigit.innerHTML = dividend;
				secondDigit.innerHTML = secondNum;
			}
			break;
	}
	if(timerIsOn == true){
		timerValue = timerlengthbox.value;
	}
	clearInterval(timerId)
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
	clearInterval(timerId);
	progress.value = progress.value + 1;
	var yourAnswer = answerBox.value;
	if(realAnswer == yourAnswer){
		answers.push("correct")
		answerdisplay.innerHTML = "Correct!"
	} else {
		answers.push("incorrect");
		answerdisplay.innerHTML = "Incorrect. The correct answer is " + realAnswer + ".";
	}
	setTimeout(setupQuestion, 2000);
}

function checkKey(){
	if(event.key == "Enter"){
		checkAnswer();
	}
}

function startRound(){
	button.innerHTML = "Submit";
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
	pages[0].style.display = "none";
	pages[1].style.display = "none";
	pages[2].style.display = "block";
	resultsdisplay.innerHTML = "Results: You got " + score + " questions correct out of " + questionsToDo + " questions total in " + Number.parseFloat(time).toFixed(1) + " seconds.";
}

function newRound(action){
	questionCount = 0;
	time = 0;
	progress.value = 0;
	symbol.innerHTML = "+";
	firstDigit.innerHTML = "1";
	secondDigit.innerHTML = "2";
	timeText.innerHTML = "Elapsed time: 0.0 seconds."
	timerText.innerHTML = "Waiting for user to start round...";
	button.innerHTML = "...";
	answers = [];
	if(action == "samesettings"){
		pages[0].style.display = "none";
		pages[1].style.display = "block";
		pages[2].style.display = "none";
	}
	if(action == "differentsettings"){
		pages[0].style.display = "block";
		pages[1].style.display = "none";
		pages[2].style.display = "none";
	}
}
