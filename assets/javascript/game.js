let money = 0;
let writtenLines = 0;
let project = new Project();
const stageElement = document.getElementById('stage');
const moneyElement = document.getElementById('money');
const office = document.getElementById('office');
const writtenLinesElement = document.getElementById('project-progress');
const employees = document.querySelector('#office > .employees');
const menu = document.querySelector('#menus');
const buttons = document.getElementsByClassName('developer__button');
const mainDeveloper = developers.find(developer => developer.id === 'main-guy');
const developersElement = document.getElementById('developers__menu');
const mainDeveloperElement = document.getElementById(mainDeveloper.id);


window.onload = function startGame() {
  mainDeveloper.levelUp(1);

  mainDeveloperElement.firstElementChild.lastElementChild.addEventListener("click", showDeveloperInfo);

  office.addEventListener("click", officeClick);

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", improveDeveloper);
    buttons[i].parentElement.parentElement.firstElementChild.firstElementChild.addEventListener("click", showDeveloperInfo);
  }

  stageElement.innerHTML= "You are in the stage "+stage;

  outsourcedWork();
  updateMoney();
  setupModalTriggers();
  updateDeveloper(mainDeveloper);
};

function outsourcedWork() {
  developers.forEach(developer => {
    if (developer.level > 0 && developer !== mainDeveloper) {
      writtenLines += developer.performance();
    }
  });

  updatePerformance();
  setTimeout(outsourcedWork, 1000);
}

function updateMoney() {
  moneyElement.innerHTML = '$' + money;
}

function updatePerformance() {
  writtenLinesElement.innerHTML = "You have written " + writtenLines + " lines of code!";

  if (writtenLines >= project.linesOfCode) {
    writtenLines = 0;
    givePayment(project.payment);
    stage++;
    project = new Project;
    stageElement.innerHTML = "You are in the stage: " + stage;
  }
}

function givePayment(value) {
  money += value;

  updateMoney();
}

function improveDeveloper(event) {
  let developerId = event.target.parentNode.parentNode.id;
  let developer = developers.find(developer => developer.id === developerId);
  let price = developer.price();

  if (money >= price) {
    money = money - price;
    developer.levelUp(1);

    if (developer.level === 1) {
      employees.innerHTML += `<img alt="${developer.name}" class="developer" src="assets/images/employees/${developer.id}.png">`;
    }

    updateDeveloper(developer);
    updateMoney();
  }
}

function updateDeveloper(developer) {
  let developerElement = document.getElementById(developer.id);
  let developerPosition = developers.indexOf(developer);
  let developerAttributes = developerElement.childNodes[3];

  developerElement.childNodes[1].classList = 'developer__icon';
  developerAttributes.childNodes[1].classList = 'developer__attribute';
  developerAttributes.childNodes[3].innerHTML = 'Level: ' + developer.level;
  developerAttributes.childNodes[3].classList = 'developer__attribute';
  developerAttributes.childNodes[5].innerHTML = 'Lines/Click: ' + developer.performance();
  developerAttributes.childNodes[5].classList = 'developer__attribute';
  developerAttributes.childNodes[7].innerHTML = 'Price: ' + developer.price() + '$';
  developerAttributes.childNodes[7].classList = 'developer__attribute';
  developerAttributes.childNodes[9].innerHTML = 'Improve skills';

  if (developersElement.lastElementChild === developerElement && developerPosition < developers.length - 1) {
    addNewMenuDeveloper(developers[developerPosition + 1]);
  }
}

function officeClick() {
  writtenLines = writtenLines + mainDeveloper.performance();

  updatePerformance();
}

function addNewMenuDeveloper(developer) {
  developersElement.insertAdjacentHTML("beforeend",`<div id=${developer.id} class="developer__menu">
        <div class="developer__icon--inactive">
          <img alt=${developer.name} class="developer" src="assets/images/employees/${developer.id}.png">
        </div>
        <div class="developer__attributes">
          <p class="developer__attribute--inactive">Name: ${developer.name}</p>
          <p class="developer__attribute--inactive">Level: ${developer.level}</p>
          <p class="developer__attribute--inactive">Lines/Click: 0</p>
          <p class="developer__attribute--inactive">Price: ${developer.price()}$</p>
          <button class="developer__button">Hire this developer</button>
        </div>
      </div>`);

  developersElement
    .lastElementChild
    .lastElementChild
    .lastElementChild
    .addEventListener("click", improveDeveloper);

  developersElement
    .lastElementChild
    .firstElementChild
    .lastElementChild
    .addEventListener("click", showDeveloperInfo);
}

function showDeveloperInfo(event) {
  let developerId = event.target.parentNode.parentNode.id;
  let developer = developers.find(developer => developer.id === developerId);
  customizeModal(developer);
  openModal();
}

function preventZoom(event) {
  event.preventDefault();

  let secondTouch = event.timeStamp;
  let firstTouch = event.currentTarget.dataset.lastTouch || secondTouch;
  let timeDifference = secondTouch - firstTouch;
  let fingers = event.touches.length;
  event.currentTarget.dataset.lastTouch = secondTouch;

  if (!timeDifference || timeDifference > 500 || fingers > 1) return; // not double-tap

  event.target.click();
}

office.addEventListener('touchstart', preventZoom);
