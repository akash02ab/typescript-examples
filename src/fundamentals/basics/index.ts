// primitive types
let isPresent: boolean = false;
let magic: number = 66.6;
let hello: string = "hello";

let notDefined: undefined = undefined;
let notPresent: null = null;

let penta: Symbol = Symbol("star");
// -> let biggy: bigint = 1234567890123456789012345678901234567890n;

/* ---------------------------------------------- */

// Generic Class types
let regexp: RegExp = new RegExp("ab+c");
let array: Array<number> = [1, 2, 3];
let set: Set<number> = new Set([1, 2, 3]);

// A first in first out collection
class Queue<T> {
	private data: Array<T> = [];
	push(item: T) {
		this.data.push(item);
	}
	pop(): T | undefined {
		return this.data.shift();
	}
}

// Instance of class Queue and it's type
let queue: Queue<number> = new Queue();
queue.push(1);
queue.push(2);
queue.pop();

/* ---------------------------------------------- */

// Array
let numbers: number[] = [1, 2, 3];

// Tuple (array of fixed length)
let tuple: [number, string] = [1, "hello"];

/* ---------------------------------------------- */

// Type Aliases

type Point = {
	x: number;
	y: number;
};

let point: Point = {
	x: 1,
	y: 2,
};

let center: Point = {
	x: 0,
	y: 0,
};

const pointer: Point = { x: 2, y: 4 };

/* ---------------------------------------------- */

// Functions
function add(a: number, b: number): number {
	return a + b;
}

function log(message: string): void {
	console.log(message);
}

function sum(...values: number[]): number {
	return values.reduce((a, b) => a + b, 0);
}

// Arrow functions
type Add = (a: number, b: number) => number;

let addTwoNum: Add = function (a, b) {
	return a + b;
};

/* ---------------------------------------------- */

// Structural Typing
type User = { id: string };
type Product = { id: string };

let user: User = { id: "user-asfef234" };
let product: Product = { id: "product-asfef234" };

user = product;
product = user;

type Point2D = { x: number; y: number };
type Point3D = { x: number; y: number; z: number };

let point2D: Point2D = { x: 0, y: 10 };
let point3D: Point3D = { x: 0, y: 10, z: 20 };

// Extra info ok
point2D = point3D;
function takesPoint2D(point: Point2D) {
	/*... */
}
takesPoint2D(point3D);

// Error: missing info
// -> point3D = point2D;
function takesPoint3D(point: Point3D) {
	/*... */
}
// -> takesPoint3D(point2D);

/* ---------------------------------------------- */

// Classes
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}

let greeter = new Greeter("world");
console.log(greeter.greet());

class Animal {
	protected name: string;
	constructor(name: string) {
		this.name = name;
	}
	move(distanceInMeters: number = 0): void {
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
let notSure: any = 4;
notSure.allows.anything.you.can.imagine();
let anySetBoolean: boolean = notSure;

let notKnown: unknown = "hello";
if (typeof notKnown === "string") {
	console.log(notKnown.length);
}

/* ---------------------------------------------- */

// Type assertions
function load(): unknown {
	return "hello";
}

let hell = load();

const trimmed = (hell as string).trim();

/* ---------------------------------------------- */

// Type casting
let leet;
leet = "1337";
const number = +leet;
console.log(number === 1337); // true

/* ---------------------------------------------- */

// Environment variables declaration

declare const process: any; // usually the declarating is on separate file env.d.ts or install @types/node

console.log(process.env.USER);

/* ---------------------------------------------- */

/* Notes
1. ts-node (typescript node) to execute typescript files
2. to use third-party library which does not support typescript such as express you need to install @types/express which is maintained by the community
*/
