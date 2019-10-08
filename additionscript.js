var firstNum;
var secondNum;

function getRandom() {
  return Math.floor(Math.random() *  13);
}

function setupQuestion(){
	firstNum = getRandom();
	document.getElementById("firstdigit").innerHTML = firstNum;
	secondNum = getRandom();
	document.getElementById("seconddigit").innerHTML = secondNum;
	document.getElementById("message").innerHTML = "Please enter your answer.";
}

function checkAnswer() {
	var realAnswer = firstNum + secondNum;
	var yourAnswer = document.getElementById("answer").value;
	if(realAnswer == yourAnswer){
		document.getElementById("message").innerHTML = "Correct. Good Job!";
	} else {
		document.getElementById("message").innerHTML = "Incorrect. The correct answer is: " + realAnswer;
	}
	document.getElementById("answer").value = "";
	setTimeout(setupQuestion, 2000);
}

function checkKey(){
	if(event.key == "Enter"){
		checkAnswer();
	}
}

setupQuestion();
