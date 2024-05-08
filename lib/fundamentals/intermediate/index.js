"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Lexical this
/*
  Other than arrow and bound function, this is driven by calling context.
  In the Person class, this is driven by the Person constructor (calling context).
  In arrow function, this is driven by lexical scoping
*/
class Person {
    constructor(_age) {
        this.arrowGrowOld = () => {
            this._age++;
        };
        this._age = _age;
    }
    growOld() {
        this._age += 1;
    }
    getAge() {
        return this._age;
    }
}
const person = new Person(18);
/*
will not work because this lost it's context as it requires proper object invoking
eg: setTimeout(() => person.growOld(), 1000)
*/
setTimeout(person.growOld, 100);
/*
will work as this gain it's context because of lexical scoping
*/
setTimeout(person.arrowGrowOld, 1000);
setTimeout(() => console.log("age:", person.getAge()), 1000);
const intersection = { x: 10, y: 20 };
/*
 * Takes a string and adds `padding` to the left.
 * If `padding` is a number, then that number of spaces is added to the left.
 * If `padding` is a string, then `padding` is added to the left.
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
padLeft("Hello world", 4); // returns "    Hello world"
padLeft("Hello world", " "); // returns " Hello world"
let direction;
direction = "North";
direction = "South";
// -> direction = 'N0rth'; // Error
function move(distanceMeters, direction) {
    console.log(`Moving ${distanceMeters} meters towards ${direction}`);
}
function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}
/* ----------------------------------------------------------------------------- */
// type narrowing
/*
 * Using instanceof to determine the type of the object
 */
class Tiger {
    roar() {
        console.log("Roar");
    }
}
class Wolf {
    howl() {
        console.log("Howl");
    }
}
function speak(animal) {
    if (animal instanceof Tiger) {
        animal.roar();
    }
    else if (animal instanceof Wolf) {
        animal.howl();
    }
    else {
        throw new Error("Unknown animal type");
    }
}
function area(shape) {
    if ("size" in shape) {
        return shape.size * shape.size;
    }
    if (shape.kind === "rectangle") {
        return shape.width * shape.height;
    }
}
function contact(details) {
    console.log(`Dear ${details.name}.
  I hope you received our email at ${details.email}.
  We will call you at ${details.phone} shortly.`);
}
contact({
    name: "John",
    email: "johndoe@mail.com",
    phone: "123456789",
});
const employee = {
    name: "John",
    email: "johndoe@mail.com",
};
function handleRequest(req) {
    req.body;
    req.json;
}
/* ----------------------------------------------------------------------------- */
