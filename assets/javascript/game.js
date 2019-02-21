var money = 0;
var click_value = 1;
var helper_count = 0;
const office = document.getElementById('office');

window.onload = function startGame(){
    document.getElementById('office').addEventListener("click", click, false);
    document.getElementById('improve_self').addEventListener("click", improveSelf, false);
    document.getElementById('hire_help').addEventListener("click", hireHelp, false);
    outsourcedMoney();
    updateMoney();
};

function outsourcedMoney() {
    money = money + helper_count;
    updateMoney();
    setTimeout(outsourcedMoney, 1000);
}

function updateMoney() {
    document.getElementById('money').innerHTML= "You have: $"+money
}

function improveSelf() {
    if(money > (Math.pow(click_value,2))){
        money = money - (Math.pow(click_value,2));
        updateMoney();
        click_value++;
    }
}

function click(){
    money = money + click_value;
    updateMoney();
}

function hireHelp() {
    if(money > (Math.pow(helper_count, 2)+1)){
        money = money - (Math.pow(helper_count, 2)+1);
        updateMoney();
        helper_count ++;
        addNewHelper();
    }
}

function addNewHelper() {
    office.innerHTML += '<img class="character" src="assets/images/main_guy.png">'
}