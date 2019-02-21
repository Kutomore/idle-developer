let stage = 1;

function Project() {
  this.linesOfCode = (Math.ceil((Math.random() * 10) + 1)) * stage;
  this.payment = (Math.ceil((Math.random() * 5) + 1)) * stage;
  document.getElementById('project-length').innerHTML = "This project is " + this.linesOfCode + " lines long!";
}
