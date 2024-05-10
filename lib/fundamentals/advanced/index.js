"use strict";
// implements keyword
Object.defineProperty(exports, "__esModule", { value: true });
function log(animal) {
    console.log(animal.name + " says " + animal.voice());
}
class Cat {
    constructor(name) {
        this.name = name;
    }
    voice() {
        return "meow";
    }
}
class Dog {
    constructor(name) {
        this.name = name;
    }
    voice() {
        return "woof";
    }
}
log(new Cat("Murphy"));
log(new Dog("Spot"));
/*---------------------------------------------------------------*/
// Definite Assignment Assertion
let dice;
function rollDice() {
    dice = Math.floor(Math.random() * 6) + 1;
}
rollDice();
console.log("Current Dice Value", dice);
rollDice();
console.log("Another Dice Roll", dice);
/*
 * :shape is Square is user defined type guards
 * type guard is used to avoid type errors such as undefined property
 * type error can be replicated by changing  `shape is Square` to `boolean`
 */
function isSquare(shape) {
    return "size" in shape;
}
function isRectangle(shape) {
    return "width" in shape && "height" in shape;
}
function area(shape) {
    if (isSquare(shape)) {
        return shape.size * shape.size;
    }
    else if (isRectangle(shape)) {
        return shape.width * shape.height;
    }
    else {
        throw new Error("Unknown shape");
    }
}
/*
 * assert function to check if the condition is true
 * if not it will throw an error
 * with type asserts condition
 * @param condition - condition to check
 * @param message - message to throw if condition is false
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
function assertDate(value) {
    if (value instanceof Date) {
        return;
    }
    else {
        throw new TypeError("Expected a date object");
    }
}
function loadPerson() {
    return { name: "John", dateOfBirth: new Date(1990, 1, 2) };
}
const maybePerson = loadPerson();
assert(maybePerson != null, "Could not load person");
console.log("Name:", maybePerson.name);
assertDate(maybePerson.dateOfBirth);
console.log("Date of Birth:", maybePerson.dateOfBirth.toISOString());
function makeDate(timestampOrYear, month, day) {
    if (month != null && day != null) {
        return new Date(timestampOrYear, month - 1, day);
    }
    else {
        return new Date(timestampOrYear);
    }
}
const doomsday = makeDate(1980, 1, 2); // 1 Jan 1980
const epoch = makeDate(0); // 1 Jan 1970
// -> const invalid = makeDate(1980, 13); // two arguments are not allowed
console.log(doomsday.toUTCString(), epoch.toISOString());
const add = (a, b, c) => {
    return a + b + (c || 0);
};
add.debugName = "Addition Function";
console.log(add(1, 2));
console.log(add(1, 2, 3));
/**
 * Aliasing with non arrow function
 */
let addition = function (a, b, c) {
    return a + b + (c || 0);
};
console.log(addition(1, 2));
console.log(addition(1, 2, 3));
/*---------------------------------------------------------------*/
// Abstract Classes
class Command {
    execute() {
        console.log("Executing command:" + this.commandLine());
    }
}
class GitResetCommand extends Command {
    commandLine() {
        return "git rest --hard";
    }
}
class GitFetchCommand extends Command {
    commandLine() {
        return "git fetch --all";
    }
}
new GitResetCommand().execute();
new GitFetchCommand().execute();
const person = {
    janexoxo: {
        displayName: "Jane Doe",
        email: "janedoe@mail.com",
    },
};
const janexoxo = person["janexoxo"];
console.log(janexoxo.displayName);
/*---------------------------------------------------------------*/
// ReadOnly Arrays and Tuples
/*
 * readonly array will not allow array to mutate
 */
function reverseSorted(input) {
    return input.slice().sort().reverse();
}
const start = [1, 2, 3, 4, 5];
const reversed = reverseSorted(start);
console.log(start); // [1, 2, 3, 4, 5]
console.log(reversed); // [5, 4, 3, 2, 1]
function move(point, x, y) {
    return [point[0] + x, point[1] + y];
}
const point = [0, 0];
const moved = move(point, 10, 10);
console.log(point); // [0, 0]
console.log(moved); // [10, 10];
/*---------------------------------------------------------------*/
// Double Assertion
const dave = {
    name: "dave",
    role: "drummer",
    skills: ["jazz", "rock", "blues"],
};
// -> dave.name = 'dave1'; // immutable
/*--------------------------------------------------------------*/
// This Parameter
/*
 * this is used for calling context in functions
 * this is auto-populated by the runtime as functions first parameter
 */
function double() {
    this.value = this.value * 2;
}
const valid = {
    value: 10,
    double,
};
valid.double();
console.log(valid.value); // 20
const invalid = {
    valve: 10,
    double,
};
function addFullName(obj) {
    return Object.assign(Object.assign({}, obj), { fullName: obj.firstName + " " + obj.lastName });
}
const user = {
    firstName: "John",
    lastName: "Doe",
};
const _user = addFullName(user);
console.log(_user.fullName);
