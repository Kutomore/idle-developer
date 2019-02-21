let money = 0;
let writtenLines = 0;
let click_value = 1;
let helper_count = 0;
let project = new Project();
const stageElement = document.getElementById('stage');
const moneyElement = document.getElementById('money');
const writtenLinesElement = document.getElementById('project-progress');
const employers = document.querySelector('#office > .employers');

window.onload = function startGame() {
	document.getElementById('office').addEventListener("click", click);
	document.getElementById('improve_self').addEventListener("click", improveSelf);
	document.getElementById('hire_help').addEventListener("click", hireDeveloper);
	document.getElementById('stage').innerHTML= "You are in the stage "+stage;
	outsourcedWork();
	updateMoney();
};

function outsourcedWork() {
	developers.forEach(developer => {
		if(developer.level > 0) {
			writtenLines += developer.performance();
		}
	});
	updatePerformance();
	setTimeout(outsourcedWork, 1000);
}

function updateMoney() {
	moneyElement.innerHTML = '$'+money
}

function updatePerformance() {
	writtenLinesElement.innerHTML = "You have written " + writtenLines + " lines of code!";
	if (writtenLines >= project.linesOfCode) {
		writtenLines = 0;
		givePayment(project.payment);
		stage++;
		project = new Project;
		stageElement.innerHTML = "You are in the stage: "+stage;
	}
}

function givePayment(value) {
	money += value;
	updateMoney();
}

function improveSelf() {
	if(money >= (Math.pow(click_value, 2))) {
		money = money - (Math.pow(click_value, 2));
		updateMoney();
		click_value++;
	}
}

function hireDeveloper() {
	let developer = developers[helper_count];
	if(money >= developer.price) {
		money = money - developer.price;
		updateMoney();
		helper_count ++;
		addNewDeveloper(developer);
	}
}

function click() {
	writtenLines = writtenLines + click_value;
	updatePerformance();
}

function addNewDeveloper(developer) {
	developer.level = 1;
	employers.innerHTML += '<img alt="' + developer.name + '" class="character" src="assets/images/employers/' + developer.imageName + '.png">'
}
