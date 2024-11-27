// closures
function makeAdding(firstNumber) {
    // "first" is scoped within the makeAdding function
    const first = firstNumber;
    return function resulting(secondNumber) {
        // "second" is scoped within the resulting function
        const second = secondNumber;
        return first + second;
    }
}

// How do we use it?
const add5 = makeAdding(5)
console.log(add5(2))

// Limitations of constructors
// 1. They look like regular javascript but do not behave like regular functions
// 2.instance of does not confirm if an object was made with constructor since the prototype of the constructor can be reassigned after the creation of the object
// Factory functions were used now instead 

// Factory Functions
// Work like constructors but levy the power of closures
// instead of the new keyword to create an object,
// factory functions set up and return the new object when you call the function
// There do not use prototype, which incurs a performance penalty
const User = function(name) {
    this.name = name;
    this.discordName = "@" + name;
}

// hey, this is a constructor
// then this can be refactored into a factory!

// function createUser(name) {
//     const discordName = "@" + name;
//     return {name, discordName};
// }

// The object shorthand notation
const name = "Bob";
const age = 28;
const color = "red";

const thatObject = { name: name, age: age, color: color };
console.log(thatObject)
// fancy way
const nowFancyObject = { name, age, color };
console.log(nowFancyObject)
console.log({name,age})

// Destructuring
// This is unpacking or extracting values from an object(or array)
const obj = {a: 1, b: 2, c: 3}
const {a, b} = obj;
console.log(a)

const array = [1, 2, 3, 4, 5];
const [zerothEle, firstEle] = array
console.log(zerothEle, firstEle)

let w, z, rest;
[w,, z, ...rest] = [10, 20, 30, 40, 50, 60];
console.log(w, z, rest)
const [c, d, ...{pop, push}] = [10, 20, 30, 40, 50, 60]
console.log(c, d, rest)

// Destructing allows you to assign a new variable to when extracting values
const user = {name: 'Fred Njonge', age: 24 }
const {name: userName, age: userAge } = user;
console.log(userName)
console.log(userAge)
// destructuring from a nested objects
const user1 = {
    johnDoe: {
        miaka: 34,
        email: "johndoe@hey.com"
    }
}
const {johnDoe: { miaka, email}} = user1;
console.log(miaka)
console.log(email)
// Destructing object into a function argument itself:
const profileUpdate = (profileData) => {
    const {name, age, nationality, location} = profileData
}
// or
// const profileUpdate = ({name, age, nationality, location})=> {}

// PRIVATE VARIABLES AND FUNCTIONS
function createUser(name) {
    const discordName = "@" + name;

    // Private variable
    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;

    return { name, discordName, getReputation, giveReputation}
}

const josh = createUser("josh");
console.log(josh)
console.log(josh.getReputation());
josh.giveReputation();
console.log({
    discordName: josh.discordName,
    reputation: josh.getReputation()
})

// PROTOTYPAL INHERITANCE WITH FACTORIES
function createPlayer(name, initialLevel) {
    const { getReputation, giveReputation } = createUser(name)

    let level = initialLevel;

    const increaseLevel = () => level++;
    return {name, getReputation, giveReputation, increaseLevel, getlevel: () => level};
}

const player1 = createPlayer('Njonge', 12)
console.log(player1)
player1.giveReputation()
player1.giveReputation()
player1.giveReputation()
player1.increaseLevel()
console.log({
    name: player1.name,
    reputation: player1.giveReputation(),
    level: player1.getlevel(),
})

// The module pattern:IIFEs-
const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
})();

console.log(calculator.add(3,5))
console.log(calculator.sub(6,2));
console.log(calculator.mul(14, 5678))
// Encapsulating with the module pattern
// encapsulation is bundling DataTransfer, code or something into a single Uint16Array, with selective access to the things inside that unit itself
// Namespacing is a technique that is used to avoid naming collisions in programs
const dog = 'snickers';
function logDog() {
  console.log(dog);
}
logDog()
function go() {
  const dog = 'sunny';
  logDog();
}
go();

function isCool(name) {
    if (name === 'wes') {
      var cool = true;
    }
    console.log(cool);
    return cool;
  }

isCool("hj")

