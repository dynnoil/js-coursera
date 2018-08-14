'use-strict';

var assert = require('assert');

var kitty = {};
var cat = {};

Object.defineProperty(cat, 'color', {
    set: function () {
        this._color = 'Ginger';
    },
    get: function () {
        return this._color;
    }
});

Object.setPrototypeOf(kitty, cat);

kitty.color = 'Grey';
assert.equal(cat.color, undefined);

var lecturer = {};
assert.equal(Object.getPrototypeOf(lecturer), Object.prototype);

var students = [];
assert.equal(Object.getPrototypeOf(students), Array.prototype);

var sleep = function () { }
assert.equal(Object.getPrototypeOf(sleep), Function.prototype);

var music = {
    genre: 'all'
};

var pop = {
    artists: ['Jamiroquai']
};

Object.setPrototypeOf(pop, music);
assert.equal('genre' in pop, true);

var person = {
    type: 'person'
}
var danny = {
    name: 'Danny',
    type: undefined
}
Object.setPrototypeOf(danny, person);
assert.equal(danny.type, undefined);
assert.equal(danny.name, 'Danny');
assert.equal(danny.toString(), '[object Object]');

var oleg = {};
oleg.type = 'oleg';
Object.setPrototypeOf(oleg, person);
assert.equal(person.type, 'person');
assert.equal(oleg.type, 'oleg');

var student = {};
Object.prototype.serialize = function () { }
assert.equal('serialize' in student, true);
assert.equal('serialize' in [], true);
assert.equal('serialize' in new Date(), true);
assert.equal('serialize' in Object, true);
assert.equal('serialize' in Object.prototype, true);

var student = {};
var lecturer = {};
lecturer.toString = function () { return 'Woohoo!'; }
assert.equal(lecturer.toString(), 'Woohoo!');
assert.equal(student.toString(), '[object Object]');
assert.equal(lecturer.toString.call(student), 'Woohoo!');
