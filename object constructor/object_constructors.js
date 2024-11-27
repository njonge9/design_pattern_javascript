// Defining an object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = () => {
        console.log(`The ${title} by ${author}, ${pages} pages, and is ${read}`)
    }
}

const theHobbit = new Book("48 laws of power", "Robert Greene", 267, "read")
theHobbit.info()

// The prototype
// All objects in JavaScript have a prototype
console.log(Book.prototype)
console.log(Object.getPrototypeOf(theHobbit))

// Recommended method for prototypal inheritance
// Use the Object.setPrototypeOf() to set or mutate it
function Person(name) {
    this.name = name
}

Person.prototype.sayName = function() {
    console.log(`Hello, I'm ${this.name}!`);
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

// Do't do this
// Use Object.setPrototype
// Player.prototype = Person.prototype

Player.prototype.getMarker = function() {
    console.log(`My marker is '${this.marker}'`)
}

// returns Object,prototype
console.log(Object.getPrototypeOf(Player.prototype))

// Now make 'Player' objects inherit from 'Person'
Object.setPrototypeOf(Player.prototype, Person.prototype);
console.log(Object.getPrototypeOf(Player.prototype))
console.log(Object.getPrototypeOf(Person.prototype))

const player1 = new Player('steve', 'X');
const player2 = new Player('fred', 'O');

// player1.sayName();
// player2.sayName();

player1.getMarker()
player2.getMarker()

// Using setPrototypeOf() after objects have already been created can result in performance issues.
// A warning… this doesn’t work:
// Player.prototype = Person.prototype;
function Enemy(name) {
    this.name = name;
    this.marker = '^';
}

// Use Object.setPrototypeOf(Enemy.prototype, Person.prototype)
// insted of
// Enemy.prototype = Person.prototype

Enemy.prototype.sayName = function() {
    console.log('HAHAHAHAHAHA');
}

Object.setPrototypeOf(Player.prototype, Enemy.prototype)

const carl = new Player('carl');
carl.sayName();
carl.getMarker();

// constructor Functions
// Initialize a constructor function for a new Hero
function Hero(name, level) {
    this.name = name;
    this.level = level;
}

// Add great method to the Hero prototype
Hero.prototype.greet = function () {
    return `${this.name} says hello.`;
}

// We use the call() method to copy over properties from constructor into another 
// Initialize Warrior constructor
function Warrior(name, level, weapon) {
    // Chain constructor with call
    Hero.call(this, name, level);

    // Add a new property
    this.weapon = weapon;
}

// Initialize Healer constructor
function Healer(name, level, spell) {
    Hero.call(this, name, level);

    this.spell = spell;
}

// Add a few methods
Warrior.prototype.attack = function () {
    return `${this.name} attacks with the ${this.weapon}.`;
}

Healer.prototype.heal = function () {
    return `${this.name} casts ${this.spell}.`
}

const hero1 = new Warrior('Bjorn', 1, 'axe')
const hero2 = new Healer('Kanin', 2, 'cure')

console.log(hero1.attack())
console.log(hero2.heal())

// To get the prototype of an object use the getPrototypeOf()
// There is a deprecated method called the __proto__

let user = {
    name: "John",
    surname: "Njonge",

    // Here this is not affected by prototype at all.
    // In a method call, this is always the object before the dot.
    // so the setter call admin.fullName= uses admin as this, not user
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

let admin = {
    __proto__: user,
    isAdmin: true
};

console.log(admin.fullName);

// Setter triggers!
admin.fullName = "Fred Muturi"

console.log(admin.fullName)
console.log(user.fullName)

// case use of this
let animal = {
    walk() {
        if(!this.isSleeping) {
            console.log(`I walk`)
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

let rabbit = {
    name: "White Rabbit",
    __proto__: animal
};

// Modifies rabbit.isSleeping
rabbit.sleep();

console.log(rabbit.isSleeping);
console.log(animal.isSleeping)
animal.walk()

// for..in loop iterates over inherited properties too.
let mammal = {
    eats: true
}

let cat = {
    jumps: true,
    __proto__: mammal
}

console.log(Object.keys(cat))
for(let prop in rabbit) console.log(prop)

// if that's not what we want , and we'd like to exclude inherited properties we can use obj.hasOwnProperty(key)
// It returns tru if obj has its own(not inherited) property named key.
for(let prop in cat) {
    let isOwn = cat.hasOwnProperty(prop);

    if(isOwn) {
        console.log(`Our: ${prop}`)
    } else {
        console.log(`Inherited: ${prop}`)
    }
}
// The hasOwnProperty is inherited from Object.prototype
// All properties from Object.prototype have enumerable set to false
// and thats the reason why it is not listed in the for..in loop

