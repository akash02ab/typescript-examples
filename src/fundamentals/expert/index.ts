// typeof type operator

const center = {
	x: 0,
	y: 0,
	z: 0,
};

/*
 * typeof center implies that x, y and z are all numbers as infered by typescript compiler
 */
type Point = typeof center;

const unit = {
	x: center.x + 1,
	y: center.y + 1,
	z: center.z + 1,
};

/*----------------------------------------------------------------*/

// Lookup Types

export type SubmitRequest = {
	presonal: {
		firstName: string;
		lastName: string;
		email: string;
	}[];
	payment: {
		creditCardToken: string;
	};
};

/*
 * Using type SubmitRequest as Lookup table
 */
type Personal = SubmitRequest["presonal"][0];
type PaymentRequest = SubmitRequest["payment"];

function getPayment(): PaymentRequest {
	return {
		creditCardToken: "1234567890",
	};
}

function getFirstName(person: Personal): string {
	return person.firstName;
}

/*---------------------------------------------------------------*/

type Person = {
	name: string;
	age: number;
	location: string;
};

const john: Person = {
	name: "John",
	age: 30,
	location: "New York",
};

function logGet<Obj, Key extends keyof Obj>(obj: Obj, key: Key) {
	const value = obj[key];
	console.log("Getting:", key, value);
	return value;
}

function logSet<Obj, Key extends keyof Obj>(
	obj: Obj,
	key: Key,
	value: Obj[Key]
) {
	obj[key] = value;
	console.log("Setting:", key, value);
}

const age = logGet(john, "age");
console.log("Age:", age);

logSet(john, "age", 31);

/*---------------------------------------------------------------*/

// Conditional types

export type TypeName<T> = T extends string
	? "string"
	: T extends number
	? "number"
	: T extends boolean
	? "boolean"
	: T extends undefined
	? "undefined"
	: T extends null
	? "null"
	: T extends object
	? "object"
	: T extends symbol
	? "symbol"
	: T extends bigint
	? "bigint"
	: T extends Function
	? "function"
	: "unknown";

function typeName<T>(arg: T): TypeName<T> {
	if (arg === null) return "null" as TypeName<T>;
	return typeof arg as TypeName<T>;
}

const str = typeName("hello world");
const num = typeName(10);
const bool = typeName(true);
const undef = typeName(undefined);
const _null = typeName(null);
const obj = typeName({});
const sym = typeName(Symbol("hello"));
// const big = typeName(10n);
const fun = typeName(function () {});

/*---------------------------------------------------------------*/

// Mapped Types

type Cordinates = {
	x: number;
	y: number;
	z: number;
};

/*
 * Need not require to implement the below type manually as it's already available in ts as Readonly<T>
 */
type ReadOnly<T> = {
	readonly [C in keyof T]: T[C];
};

const centeroid: Readonly<Cordinates> = {
	x: 0,
	y: 0,
	z: 0,
};

// -> centeroid.x = 10; // Error: Cannot assign to 'x' because it is a read-only property.

/*---------------------------------------------------------------*/

// Mapped type modifier using Partial as example

/*
 * Partial<T> will make all properties in T optional
 * update is called with:
 * state as first argument which has infered type of { x: number, y: number }
 * { y : 10 } as second argument which has infered type of { y : number }
 * for second argument using Partial<T> to make all properties optional
 */
function update<T>(curr: T, next: Partial<T>): T {
	return {
		...curr,
		...next,
	};
}

const state = {
	x: 0,
	y: 0,
};

const nextState = update(state, { y: 10 });

console.log(nextState);

/*---------------------------------------------------------------*/
