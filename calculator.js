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
	let secondOperand = numbers[numbers.length - 1];
	let solution;
	switch (operatorId) {
		case "add-btn":
			solution = secondOperand + currentNum;
			break;
		case "sub-btn":
			solution = secondOperand - currentNum;
			break;
		case "mult-btn":
			solution = secondOperand * currentNum;
			break;
		case "divide-btn":
			solution = currentNum == 0 ? "Nope" : secondOperand / currentNum;
			break;
		case "exp-btn":
			solution = secondOperand ** currentNum;
			break;
		case null:
			solution = "null operatorId";
			break;
		default:
			solution = "solution not initialized";
	}
	return solution;
}

function equals() {
	//Right now this is the same as calculate, just without setting the currentOperator or pushing the durrent Dispaly
	if (currentNum == "") return;
	if (numbers.length >= 2) {
		let solution = getSolution();
		currentNum = solution;
		setDisplay(currentNum);
		operatorId = "";
	}
}

function calculate(e) {
	if (currentNum == "") return;
	currentOperator = e.target.id;
	//Add current display to numbers array
	numbers.push(currentNum);
	//If there are two or more numbers in the numbers array, calculate solution given the current operator and update display with it
	if (numbers.length >= 2) {
		let solution = getSolution();
		currentNum = solution;
		setDisplay(currentNum);
		operatorId = "";
	}
	operatorJustPressed = true;
	document.getElementById("current-num").textContent = currentNum;
	document.getElementById("numbers").textContent = numbers;
	document.getElementById("operator").textContent = currentOperator;
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
		setDisplay("");
	}
	currentNum = currentNum.toString() + num.toString();
	setDisplay(currentNum);
	operatorJustPressed = false;
	document.getElementById("current-num").textContent = currentNum;
	document.getElementById("numbers").textContent = numbers;
	document.getElementById("operator").textContent = currentOperator;
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
