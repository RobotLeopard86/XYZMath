function getRandom() {
  return Math.floor(Math.random() *  13);
}


var firstNum = getRandom();
document.getElementById("firstdigit").innerHTML = firstNum;
var secondNum = getRandom();
document.getElementById("seconddigit").innerHTML = secondNum;


function checkAnswer() {
	var realAnswer = firstNum + secondNum;
	var yourAnswer = document.getElementById("answer").value;
	if(realAnswer == yourAnswer){
		document.getElementById("message").innerHTML = "Correct. Good Job!";
	} else {
		document.getElementById("message").innerHTML = "Incorrect. Please try again.";
	}
	document.getElementById("answer").value = "";
}

function checkKey(){
	if(event.key == "Enter"){
		checkAnswer();
	}
}
