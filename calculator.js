let currentNum = "";
let numbers = [];
let currentOperator = "";
let operatorJustPressed = false;

//Add event listeners to each of the digits
let digits = document.querySelectorAll(".digit");
for (let i = 0; i < digits.length; i++) {
	digits[i].addEventListener("click", () => {
		addDigit(digits[i].innerText);
	});
}
//Add event listeners to each of the operators
let operatorKeys = document.querySelectorAll(".operator");
for (let i = 0; i < operatorKeys.length; i++) {
	operatorKeys[i].addEventListener("click", calculate);
}

document.getElementById("back-btn").addEventListener("click", backspace);
document.getElementById("clear-btn").addEventListener("click", fullReset);
document.getElementById("decimal-btn").addEventListener("click", addDecimal);
document.getElementById("equals-btn").addEventListener("click", calculate);
document.getElementById("sqrt-btn").addEventListener("click", getSqrt);
document.getElementById("neg-btn").addEventListener("click", negate);

function getSolution() {
	//Ensure the operands are floats
	let firstOperand = parseFloat(numbers[numbers.length - 2]);
	let secondOperand = parseFloat(currentNum);
	let solution;
	switch (currentOperator) {
		case "plus-btn":
			solution = firstOperand + secondOperand;
			break;
		case "sub-btn":
			solution = firstOperand - secondOperand;
			break;
		case "mult-btn":
			solution = firstOperand * secondOperand;
			break;
		case "divide-btn":
			solution = secondOperand == 0 ? "Nope" : firstOperand / secondOperand;
			break;
		case "exp-btn":
			solution = firstOperand ** secondOperand;
			break;
		case "equals-btn":
			solution = secondOperand;
			break;
		default:
			solution = "solution not initialized";
	}
	return solution;
}

//Function that determines if it's time to get a solution, and calls getSolution if so
function calculate(e) {
	if (currentNum == "") return;
	//Pressing an operator means the user is done adding digits, so add the current number to our array now
	numbers.push(parseFloat(currentNum));
	//If there's an even count of numbers in our array, it's time to get a solution
	if (numbers.length % 2 == 0) {
		let solution = getSolution();
		numbers.push(solution);
		currentNum = solution;
		setDisplay(currentNum);
	}
	currentOperator = e.target.id;
	operatorJustPressed = true;
}

//Functions for special operators with only one number required
function getSqrt() {
	if (currentNum == "") return;
	currentNum = Math.sqrt(currentNum);
	setDisplay(currentNum);
}

function negate() {
	if (currentNum == "") return;
	if (currentNum > 0) {
		currentNum = "-" + currentNum;
	} else if (currentNum < 0) {
		currentNum = currentNum.substring(1);
	}
	setDisplay(currentNum);
}

//Display functions
function addDigit(num) {
	if (operatorJustPressed) {
		currentNum = num;
	} else {
		currentNum = currentNum.toString() + num.toString();
	}
	//Set font size smaller if required
	if (currentNum.length > 10) {
		document.getElementById("display-text").style.fontSize = "30px";
	}
	if (currentNum.length > 17) {
		document.getElementById("display-text").style.fontSize = "20px";
	}

	setDisplay(currentNum);
	operatorJustPressed = false;
}

function backspace() {
	if (currentNum == "") return;
	currentNum = currentNum.substring(0, currentNum.length - 1);
	setDisplay(currentNum);
}

function addDecimal() {
	if (currentNum == "") {
		currentNum = "0";
	}
	//No repeat decimals
	if (currentNum.slice(-1) == ".") return;
	currentNum = currentNum + ".";
	setDisplay(currentNum);
}

function fullReset() {
	currentNum = "";
	numbers = [];
	currentOperator = "";
	document.getElementById("display-text").innerText = "";
	operatorJustPressed = false;
	document.getElementById("display-text").style.fontSize = "50px";
}

//Ease of use function
function setDisplay(newDisplay) {
	document.getElementById("display-text").innerText = newDisplay;
}
