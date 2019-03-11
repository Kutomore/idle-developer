function Developer(id, name, price, basePerformance, description, buffs) {
  this.id = id;
  this.name = name;
  this.basePrice = price;
  this.basePerformance = basePerformance;
  this.description = description;
  this.buffs = buffs;
  this.level = 0;
  this.speed = 1;

  this.performance = function() {
    let performance = basePerformance + Math.floor((this.level * basePerformance) / 2);

    return this.buffs.reduce((performance, buff) => {
      if (buff.active && buff.target === 'performance') {
        return performance += performance * buff.value;
      }
      return Math.ceil(performance);
    }, performance);
  };

  this.levelUp = function (amount) {
    let level = this.level + amount;

    this.level = level;
    this.buffs.forEach(buff => {
        if (!buff.active && buff.requiredLevel <= level) {
          buff.active = true;
        }
      }
    )
  };

  this.price = () => this.basePrice + this.basePrice * this.level * this.level;
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
    'main-guy',
    "Main Guy",
    1,
    1,
    "It's you, or at least our imagination of you since we didn't implement character customization!",
    [
      new Buff(10, 'Increase your performance by 50%', 'performance', 0.5),
      new Buff(25, 'Double your performance, wow!', 'performance', 1),
      new Buff(50, 'And again! But only by 25%', 'performance', 0.25),
      new Buff(100, 'Oh boy, another increase, this time by 40%', 'performance', 0.4),
      new Buff(250, 'This is a small buff, but a big one as a whole, 10%', 'performance', 0.1),
      new Buff(500, 'Will increase your performance by 60%, you are almost at the top', 'performance', 0.6),
      new Buff(1000, 'Triple your base performance, best coder alive!', 'basePerformance', 2)
    ]
  ),
  new Developer(
    'noobium-foreverintern',
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
    ]
  ),
  new Developer(
    'invisible-man',
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
    ]
  ),
  new Developer(
    'invisible-woman',
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
    ]
  )
];
