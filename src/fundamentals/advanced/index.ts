// implements keyword

type Animal = {
	name: string;
	voice(): string;
};

function log(animal: Animal) {
	console.log(animal.name + " says " + animal.voice());
}

class Cat implements Animal {
	constructor(public name: string) {}
	voice() {
		return "meow";
	}
}

class Dog implements Animal {
	constructor(public name: string) {}
	voice() {
		return "woof";
	}
}

log(new Cat("Murphy"));
log(new Dog("Spot"));

/*---------------------------------------------------------------*/

// Definite Assignment Assertion

let dice!: number;

function rollDice() {
	dice = Math.floor(Math.random() * 6) + 1;
}

rollDice();
console.log("Current Dice Value", dice);
rollDice();
console.log("Another Dice Roll", dice);

/*---------------------------------------------------------------*/

type Square = {
	size: number;
};

type Rectangle = {
	width: number;
	height: number;
};

type Shape = Square | Rectangle;

/*
 * :shape is Square is user defined type guards
 * type guard is used to avoid type errors such as undefined property
 * type error can be replicated by changing  `shape is Square` to `boolean`
 */
function isSquare(shape: Shape): shape is Square {
	return "size" in shape;
}

function isRectangle(shape: Shape): shape is Rectangle {
	return "width" in shape && "height" in shape;
}

function area(shape: Shape) {
	if (isSquare(shape)) {
		return shape.size * shape.size;
	} else if (isRectangle(shape)) {
		return shape.width * shape.height;
	} else {
		throw new Error("Unknown shape");
	}
}

/*---------------------------------------------------------------*/

// assertion function

type Person = {
	name: string;
	dateOfBirth?: Date;
};

/*
 * assert function to check if the condition is true
 * if not it will throw an error
 * with type asserts condition
 * @param condition - condition to check
 * @param message - message to throw if condition is false
 */
function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

function assertDate(value: unknown): asserts value is Date {
	if (value instanceof Date) {
		return;
	} else {
		throw new TypeError("Expected a date object");
	}
}

function loadPerson(): Person | null {
	return null;
}

const maybePerson = loadPerson();

assert(maybePerson != null, "Could not load person");
console.log("Name:", maybePerson.name);

assertDate(maybePerson.dateOfBirth);
console.log("Date of Birth:", maybePerson.dateOfBirth.toISOString());
