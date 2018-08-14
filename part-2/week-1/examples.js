var assert = require('assert');

var person = {
    type: 'human',
    getName: function () {
        return this.name;
    }
}

var student = {
    name: 'Billy',
};

var lecturer = Object.create(person);
lecturer.name = 'Sergey';
assert.equal(lecturer.getName(), 'Sergey');

Object.setPrototypeOf(student, person);
assert.equal(student.getName(), 'Billy');
assert.equal(Object.getPrototypeOf(student), person);
assert.equal(Object.getPrototypeOf(person), Object.prototype);
assert.equal(Object.getPrototypeOf(Object.prototype), null);

assert.equal(student.type, 'human');
student.type = 'robot';
assert.equal(student.type, 'robot');
assert.equal(person.type, 'human');

assert.equal(student.toString(), '[object Object]');
student.toString = function () {
    return this.name;
}.bind(student);
assert.equal(student.toString(), 'Billy');
assert.equal(person.toString(), '[object Object]');

Object.defineProperty(person, 'gender', {
    writable: false,
    value: 'male'
});
assert.equal(person.gender, 'male');
person.gender = 'female';
assert.equal(person.gender, 'male');

Object.defineProperty(person, 'planet', {
    writable: false,
    value: 'Earth'
});
assert.equal(student.planet, 'Earth');
student.planet = 'Mars';
assert.equal(student.planet, 'Earth');

Object.defineProperty(person, 'age', {
    enumerable: false,
    set: function (age) { this._age = parseInt(age); },
    get: function () { return this._age; }
});
student.age = '20 лет';
assert.equal(student.age, 20);
assert.equal(student.hasOwnProperty('age'), false);

assert.deepEqual(Object.keys(student), ['name', 'type', 'toString', '_age']);
assert.deepEqual(Object.keys(person), ['type', 'getName']);
