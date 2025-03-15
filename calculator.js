//TODO: I run into trouble when using multiple (three) operators/equals in a row; they stop calculating

let displayStr = document.getElementById("display-text").innerText;
let num1 = null;
let num2 = null;
let operatorId = null;
let operatorJustPressed = false;

//Add event listeners to each of the digits
let digits = document.querySelectorAll(".digit");
for (let i = 0; i < digits.length; i++) {
	digits[i].addEventListener("click", () => {
		addDigitToDisplay(digits[i].innerText);
	});
}
//Add event listeners to each of the operators
let operators = document.querySelectorAll(".operator");
for (let i = 0; i < operators.length; i++) {
	operators[i].addEventListener("click", calculate);
}

document
	.getElementById("back-btn")
	.addEventListener("click", removeLastDisplayDigit);

document.getElementById("clear-btn").addEventListener("click", fullReset);
document.getElementById("decimal-btn").addEventListener("click", addDecimal);
document.getElementById("equals-btn").addEventListener("click", calculate);
document.getElementById("sqrt-btn").addEventListener("click", getSqrt);
document.getElementById("neg-btn").addEventListener("click", negate);

function getSolution() {
	//Assumes that operatorId is true
	let solution;
	switch (operatorId) {
		case "add-btn":
			solution = num1 + num2;
			break;
		case "sub-btn":
			solution = num1 - num2;
			break;
		case "mult-btn":
			solution = num1 * num2;
			break;
		case "divide-btn":
			solution = num2 == 0 ? "Nope" : num1 / num2;
			break;
		case "exp-btn":
			solution = num1 ** num2;
			break;
		case null:
			solution = "null operatorId";
			break;
		default:
			solution = "solution not initialized";
	}
	return solution;
}

function equals() {}

function calculate(e) {
	if (displayStr != "") {
		if (e.target.id != "equals-btn") {
			operatorId = e.target.id;
		}
		if (!num1) {
			//Store num1 (complete display) and operator clicked
			num1 = parseFloat(displayStr);
		} else if (!operatorJustPressed) {
			//Store num2 (display)
			num2 = parseFloat(displayStr);
			displayStr = getSolution();
			document.getElementById("display-text").innerText = displayStr;
			//Current display is the new num1
			num1 = displayStr;
			//Reset everything except num1
			operatorId = null;
			num2 = null;
		}
		operatorJustPressed = true;
	}
}

//Special operators with only one num required
function getSqrt() {
	if (displayStr != "") {
		displayStr = Math.sqrt(parseFloat(displayStr));
		setDisplay();
	}
}
function negate() {
	if (parseFloat(displayStr) > 0) {
		displayStr = "-" + displayStr;
	} else if (parseFloat(displayStr) < 0) {
		displayStr = displayStr.substring(1);
	}
	setDisplay();
}

//Display functions
function addDigitToDisplay(num) {
	//If an operator was just pressed, reset display first
	if (operatorJustPressed) {
		displayStr = "";
	}
	displayStr = displayStr + num;
	setDisplay();
	operatorJustPressed = false;
}

function removeLastDisplayDigit() {
	displayStr = displayStr.substring(0, displayStr.length - 1);
	setDisplay();
}

function addDecimal() {
	if (displayStr == "") {
		displayStr = "0";
	}
	displayStr = displayStr + ".";
	setDisplay();
}

function fullReset() {
	displayStr = "";
	document.getElementById("display-text").innerText = displayStr;
	num1 = null;
	num2 = null;
	operatorId = null;
	operatorJustPressed = false;
}

//Ease of use function
function setDisplay() {
	document.getElementById("display-text").innerText = displayStr;
}
