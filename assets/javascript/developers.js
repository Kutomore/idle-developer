function Developer(name, price, basePerformance, description, buffs, imageName) {
  this.name = name;
  this.price = price;
  this.basePerformance = basePerformance;
  this.description = description;
  this.buffs = buffs;
  this.level = 0;
  this.speed = 1;
  this.imageName = imageName;
  this.performance = function() {
    let performance = basePerformance + Math.floor((this.level * basePerformance) / 2);
    let extra_performance = 0;
    this.buffs.forEach(
      function (buff) {
        if(buff.active && buff.target === 'performance'){
          performance += performance * buff.value;
        }
      }
    );
    performance += extra_performance;
    return performance
  }
}

function Buff(requiredLevel, description, target, value) {
  this.requiredLevel = requiredLevel;
  this.description = description;
  this.target = target;
  this.value = value;
  this.active = false;
}

let developers = [
  new Developer(
    "Noobium Foreverintern",
    40,
    3,
    "He doesn't know alot, but he tries hard!",
    [
      new Buff(10, 'Increase his performance by 5%', 'performance', 0.05),
      new Buff(25, 'Increase his speed by 10%', 'speed', 0.1),
      new Buff(50, 'Increase his performance by 25%', 'performance', 0.25),
      new Buff(100, 'Increase his speed by 40%', 'speed', 0.4),
      new Buff(250, 'Increase his speed by 50%', 'speed', 0.5),
      new Buff(500, 'Increase his performance by 60%', 'performance', 0.6),
      new Buff(1000, 'Double his base performance', 'basePerformance', 1)
    ],
    'noobium-foreverintern'
  ),
  new Developer(
    "Invisible man",
    60,
    4,
    "You can't see him, but he's there... Maybe!",
    [
      new Buff(10, 'Increase his performance by 15%', 'performance', 0.15),
      new Buff(25, 'Increase his performance by 25%', 'performance', 0.25),
      new Buff(50, 'Increase his performance by 35%', 'performance', 0.35),
      new Buff(100, 'Increase his speed by 10%', 'speed', 0.1),
      new Buff(250, 'Increase his speed by 25%', 'speed', 0.25),
      new Buff(500, 'Increase his performance by 12%', 'performance', 0.12),
      new Buff(1000, 'Double his base performance', 'basePerformance', 1)
    ],
    'invisible-man'
  ),
  new Developer(
    "Invisible woman",
    100,
    10,
    "No relation with the invisible man, they look totally different!",
    [
      new Buff(10, 'Increase her performance by 15%', 'performance', 0.15),
      new Buff(25, 'Increase her performance by 25%', 'performance', 0.25),
      new Buff(50, 'Increase her performance by 35%', 'performance', 0.35),
      new Buff(100, 'Increase her speed by 10%', 'speed', 0.1),
      new Buff(250, 'Increase her speed by 25%', 'speed', 0.25),
      new Buff(500, 'Increase her performance by 12%', 'performance', 0.12),
      new Buff(1000, 'Double her base performance', 'basePerformance', 1)
    ],
    'invisible-woman'
  )
];
