function getRandom() {
  return Math.floor(Math.random() *  13) + 1;
}


var firstNum = getRandom();
var secondNum = getRandom();
var dividend = firstNum * secondNum;
document.getElementById("firstdigit").innerHTML = dividend;
document.getElementById("seconddigit").innerHTML = secondNum;


function checkAnswer() {
	var yourAnswer = document.getElementById("answer").value;
	if(firstNum == yourAnswer){
		document.getElementById("message").innerHTML = "Correct. Good Job!";
	} else {
		document.getElementById("message").innerHTML = "Incorrect. Please try again.";
	}
}
