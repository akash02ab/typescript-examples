// Lexical this
/*
  Other than arrow and bound function, this is driven by calling context.
  In the Person class, this is driven by the Person constructor (calling context).
  In arrow function, this is driven by lexical scoping
*/
class Person {
	private _age: number;
	constructor(_age: number) {
		this._age = _age;
	}
	growOld() {
		this._age += 1;
	}
	getAge() {
		return this._age;
	}
	arrowGrowOld = () => {
		this._age++;
	};
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

/* ----------------------------------------------------------------------------- */

// readonly modifier
type Cordinates = {
	readonly x: number;
	readonly y: number;
};

const intersection: Cordinates = { x: 10, y: 20 };
// -> intersection.x = 100; // Error

/* ----------------------------------------------------------------------------- */

// Union types

type Padding = number | string;

/*
 * Takes a string and adds `padding` to the left.
 * If `padding` is a number, then that number of spaces is added to the left.
 * If `padding` is a string, then `padding` is added to the left.
 */
function padLeft(value: string, padding: Padding) {
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
// -> padLeft("Hello world", true); // throws an error

/* ----------------------------------------------------------------------------- */

// Literal types
type CardinalDirection = "North" | "South" | "East" | "West";
let direction: CardinalDirection;
direction = "North";
direction = "South";
// -> direction = 'N0rth'; // Error

function move(distanceMeters: number, direction: CardinalDirection) {
	console.log(`Moving ${distanceMeters} meters towards ${direction}`);
}

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceValue {
	return (Math.floor(Math.random() * 6) + 1) as DiceValue;
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

type WildAnimal = Tiger | Wolf;

function speak(animal: WildAnimal) {
	if (animal instanceof Tiger) {
		animal.roar();
	} else if (animal instanceof Wolf) {
		animal.howl();
	} else {
		throw new Error("Unknown animal type");
	}
}

/*
 * using in property to identify the type of the object
 */
type Square = {
	size: number;
};

type Rectangle = {
	kind: "rectangle";
	width: number;
	height: number;
};

type Shape = Square | Rectangle;

function area(shape: Shape) {
	if ("size" in shape) {
		return shape.size * shape.size;
	}
	if (shape.kind === "rectangle") {
		return shape.width * shape.height;
	}
}

/* ----------------------------------------------------------------------------- */

// Intersection types

type Parson = {
	name: string;
};

type Email = {
	email: string;
};

type Phone = {
	phone: string;
};

function contact(details: Parson & Email & Phone) {
	console.log(`Dear ${details.name}.
  I hope you received our email at ${details.email}.
  We will call you at ${details.phone} shortly.`);
}

contact({
	name: "John",
	email: "johndoe@mail.com",
	phone: "123456789",
});

/* ----------------------------------------------------------------------------- */

// Optional modifier

type Employee = {
	name: string;
	email: string;
	age?: number;
};

const employee: Employee = {
	name: "John",
	email: "johndoe@mail.com",
};

/* ----------------------------------------------------------------------------- */

/**
 * Type supports Unions, Intersection, Primitives, Shorthand Functions, Advance Type Functions
 */
type InputValue = string; // primitives
type InputOnChange = (newValue: InputValue) => void; // shorthand functions
type InputType = "text" | "password"; // union

export type InputProps = {
	type: InputType;
	value: InputValue;
	onChange: InputOnChange;
};

/**
 * Interface supports Declaration Merging and familiarity (extends)
 */
interface Request {
	body: any;
}

interface Request {
	json: any;
}

function handleRequest(req: Request) {
	req.body;
	req.json;
}

/* ----------------------------------------------------------------------------- */
