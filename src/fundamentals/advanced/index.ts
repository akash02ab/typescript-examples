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
	return { name: "John", dateOfBirth: new Date(1990, 1, 2) };
}

const maybePerson = loadPerson();

assert(maybePerson != null, "Could not load person");
console.log("Name:", maybePerson.name);

assertDate(maybePerson.dateOfBirth);
console.log("Date of Birth:", maybePerson.dateOfBirth.toISOString());

/*---------------------------------------------------------------*/

// Function Overlading
/*
 * first two signatures are function overlading but will be ignored by node run time
 * here function overloading is used to ensure that the function is called with correct arguments
 */
function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(timestampOrYear: number, month?: number, day?: number): Date {
	if (month != null && day != null) {
		return new Date(timestampOrYear, month - 1, day);
	} else {
		return new Date(timestampOrYear);
	}
}

const doomsday = makeDate(1980, 1, 2); // 1 Jan 1980
const epoch = makeDate(0); // 1 Jan 1970
// -> const invalid = makeDate(1980, 13); // two arguments are not allowed
console.log(doomsday.toUTCString(), epoch.toISOString());

/*---------------------------------------------------------------*/

// Call Signatures

type Add = {
	(a: number, b: number): number;
	(a: number, b: number, c: number): number;
	debugName?: string;
};

const add: Add = (a: number, b: number, c?: number) => {
	return a + b + (c || 0);
};
add.debugName = "Addition Function";

console.log(add(1, 2));
console.log(add(1, 2, 3));

/**
 * Aliasing with non arrow function
 */
let addition: Add = function (a: number, b: number, c?: number) {
	return a + b + (c || 0);
};

console.log(addition(1, 2));
console.log(addition(1, 2, 3));

/*---------------------------------------------------------------*/

// Abstract Classes

abstract class Command {
	abstract commandLine(): string;

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
// -> new GitCommand().execute(); // error

/*---------------------------------------------------------------*/

// Index Signatures

type Parson = {
	displayName: string;
	email: string;
};

type ParsonDictionary = {
	[username: string]: Parson;
};

const person: ParsonDictionary = {
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

function reverseSorted(input: readonly number[]): number[] {
	return input.slice().sort().reverse();
}

const start = [1, 2, 3, 4, 5];
const reversed = reverseSorted(start);
console.log(start); // [1, 2, 3, 4, 5]
console.log(reversed); // [5, 4, 3, 2, 1]

type Point = readonly [number, number];

function move(point: Point, x: number, y: number): Point {
	return [point[0] + x, point[1] + y];
}

const point: Point = [0, 0];
const moved = move(point, 10, 10);

console.log(point); // [0, 0]
console.log(moved); // [10, 10];

/*---------------------------------------------------------------*/

// Double Assertion

const dave = {
	name: "dave",
	role: "drummer",
	skills: ["jazz", "rock", "blues"],
} as const;

// -> dave.name = 'dave1'; // immutable

/*--------------------------------------------------------------*/

// This Parameter

/*
 * this is used for calling context in functions
 * this is auto-populated by the runtime as functions first parameter
 */

function double(this: { value: number }) {
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

// -> invalid.double(); // Error: Property 'value' does not exist on type '{ valve: number; double: () => void; }'.

/*---------------------------------------------------------------*/

// Generic Constraints

type NameFields = { firstName: string; lastName: string };

function addFullName<T extends NameFields>(obj: T): T & { fullName: string } {
	return {
		...obj,
		fullName: obj.firstName + " " + obj.lastName,
	};
}

const user = {
	firstName: "John",
	lastName: "Doe",
};

const _user = addFullName(user);
console.log(_user.fullName);