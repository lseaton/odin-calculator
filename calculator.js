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
document.getElementById("equals-btn").addEventListener("click", equals);
document.getElementById("sqrt-btn").addEventListener("click", getSqrt);
document.getElementById("neg-btn").addEventListener("click", negate);

function getSolution() {
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
		case "":
			solution = secondOperand;
			break;
		default:
			solution = "solution not initialized";
	}
	return solution;
}

function equals() {
	//Right now this is the same as calculate, just without setting the currentOperator or pushing the current dispaly
	if (currentNum == "") return;
	numbers.push(parseFloat(currentNum));
	if (numbers.length % 2 == 0) {
		let solution = getSolution();
		numbers.push(parseFloat(solution));
		currentNum = solution;
		setDisplay(currentNum);
		currentOperator = "";
	}
	operatorJustPressed = true;
}

function calculate(e) {
	if (currentNum == "") return;
	//Add current display to numbers array
	numbers.push(parseFloat(currentNum));
	//If there are two or more numbers in the numbers array, calculate solution given the current operator and update display with it
	if (numbers.length % 2 == 0) {
		let solution = getSolution();
		numbers.push(parseFloat(solution));
		currentNum = solution;
		setDisplay(currentNum);
		currentOperator = "";
	}
	currentOperator = e.target.id;
	operatorJustPressed = true;
}

//Special operators with only one num required
function getSqrt() {
	if (currentNum == "") return;
	let sqrtNum;
	sqrtNum = Math.sqrt(currentNum);
	setDisplay(sqrtNum);
}

function negate() {
	if (currentNum == "") return;
	let negatedNum;
	if (currentNum > 0) {
		negatedNum = "-" + currentNum;
	} else if (currentNum < 0) {
		negatedNum = currentNum.substring(1);
	}
	setDisplay(negatedNum);
}

//Display functions
function addDigit(num) {
	//If an operator was just pressed, reset display first
	if (operatorJustPressed) {
		currentNum = num;
	} else {
		currentNum = currentNum.toString() + num.toString();
	}
	setDisplay(currentNum);
	operatorJustPressed = false;
}

function backspace() {
	if (currentNum == "") return;
	let newDisplay = currentNum.substring(0, currentNum.length - 1);
	setDisplay(newDisplay);
}

function addDecimal() {
	if (currentNum == "") {
		currentNum = "0";
	}
	let newNum = currentNum + ".";
	setDisplay(newNum);
}

function fullReset() {
	currentNum = "";
	numbers = [];
	currentOperator = "";
	document.getElementById("display-text").innerText = "";
	operatorJustPressed = false;
}

//Ease of use function
function setDisplay(newDisplay) {
	document.getElementById("display-text").innerText = newDisplay;
}
