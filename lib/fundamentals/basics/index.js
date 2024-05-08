"use strict";
// primitive types
let isPresent = false;
let magic = 66.6;
let hello = "hello";
let notDefined = undefined;
let notPresent = null;
let penta = Symbol("star");
// -> let biggy: bigint = 1234567890123456789012345678901234567890n;
/* ---------------------------------------------- */
// Generic Class types
let regexp = new RegExp("ab+c");
let array = [1, 2, 3];
let set = new Set([1, 2, 3]);
// A first in first out collection
class Queue {
    constructor() {
        this.data = [];
    }
    push(item) {
        this.data.push(item);
    }
    pop() {
        return this.data.shift();
    }
}
// Instance of class Queue and it's type
let queue = new Queue();
queue.push(1);
queue.push(2);
queue.pop();
/* ---------------------------------------------- */
// Array
let numbers = [1, 2, 3];
// Tuple (array of fixed length)
let tuple = [1, "hello"];
let point = {
    x: 1,
    y: 2,
};
let center = {
    x: 0,
    y: 0,
};
const pointer = { x: 2, y: 4 };
/* ---------------------------------------------- */
// Functions
function add(a, b) {
    return a + b;
}
function log(message) {
    console.log(message);
}
function sum(...values) {
    return values.reduce((a, b) => a + b, 0);
}
let addTwoNum = function (a, b) {
    return a + b;
};
let user = { id: "user-asfef234" };
let product = { id: "product-asfef234" };
user = product;
product = user;
let point2D = { x: 0, y: 10 };
let point3D = { x: 0, y: 10, z: 20 };
// Extra info ok
point2D = point3D;
function takesPoint2D(point) {
    /*... */
}
takesPoint2D(point3D);
// Error: missing info
// -> point3D = point2D;
function takesPoint3D(point) {
    /*... */
}
// -> takesPoint3D(point2D);
/* ---------------------------------------------- */
// Classes
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
console.log(greeter.greet());
class Animal {
    constructor(name) {
        this.name = name;
    }
    move(distanceInMeters = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Dog extends Animal {
    bark() {
        console.log(this.name + " says Woof! Woof!");
    }
}
const dog = new Dog("Mitzie");
dog.bark();
/* ---------------------------------------------- */
// any and unknown
let notSure = 4;
notSure.allows.anything.you.can.imagine();
let anySetBoolean = notSure;
let notKnown = "hello";
if (typeof notKnown === "string") {
    console.log(notKnown.length);
}
/* ---------------------------------------------- */
// Type assertions
function load() {
    return "hello";
}
let hell = load();
const trimmed = hell.trim();
/* ---------------------------------------------- */
// Type casting
let leet;
leet = "1337";
const number = +leet;
console.log(number === 1337); // true
console.log(process.env.USER);
/* ---------------------------------------------- */
/* Notes
1. ts-node (typescript node) to execute typescript files
2. to use third-party library which does not support typescript such as express you need to install @types/express which is maintained by the community
*/
