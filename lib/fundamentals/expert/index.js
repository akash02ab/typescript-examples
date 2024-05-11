"use strict";
// typeof type operator
Object.defineProperty(exports, "__esModule", { value: true });
const center = {
    x: 0,
    y: 0,
    z: 0,
};
const unit = {
    x: center.x + 1,
    y: center.y + 1,
    z: center.z + 1,
};
function getPayment() {
    return {
        creditCardToken: "1234567890",
    };
}
function getFirstName(person) {
    return person.firstName;
}
const john = {
    name: "John",
    age: 30,
    location: "New York",
};
function logGet(obj, key) {
    const value = obj[key];
    console.log("Getting:", key, value);
    return value;
}
function logSet(obj, key, value) {
    obj[key] = value;
    console.log("Setting:", key, value);
}
const age = logGet(john, "age");
console.log("Age:", age);
logSet(john, "age", 31);
function typeName(arg) {
    if (arg === null)
        return "null";
    return typeof arg;
}
const str = typeName("hello world");
const num = typeName(10);
const bool = typeName(true);
const undef = typeName(undefined);
const _null = typeName(null);
const obj = typeName({});
const sym = typeName(Symbol("hello"));
// const big = typeName(10n);
const fun = typeName(function () { });
const centeroid = {
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
function update(curr, next) {
    return Object.assign(Object.assign({}, curr), next);
}
const state = {
    x: 0,
    y: 0,
};
const nextState = update(state, { y: 10 });
console.log(nextState);
/*---------------------------------------------------------------*/
