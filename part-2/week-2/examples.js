var assert = require('assert');

function createStudent(name) {
    return {
        name: name,
        sleep: function () {
            console.log('zzzZZ ...');
        }
    }
}

var billy = createStudent('Billy');

var studentProto = {
    sleep: function () {
        console.log('zzzZZ ...');
    }
};

function createStudentNew(name) {
    var student = {
        name: name
    }
    Object.setPrototypeOf(student, studentProto);
    return student;
}

var willy = createStudentNew('Willy');

function Student(name) {
    this.name = name;
}

var oleg = new Student('Oleg');
assert.equal(oleg.name, 'Oleg');

var igor = Student('Igor');
assert.equal(igor, undefined);
assert.equal('name' in global, true);
delete global.name;
assert.equal('name' in global, false);


Student.prototype.sleep = function () {
    return 'ZZZ zzz';
}
assert.equal(Student.prototype.constructor, Student);
var petya = new Student('Petya');
assert.equal(Object.getPrototypeOf(petya), Student.prototype);
assert.equal(petya.sleep(), 'ZZZ zzz');

function Person() {
    this.type = 'human';
}
Person.prototype.getName = function () {
    return this.name;
}
// Object.create() в качестве аргумента может принимать прототип либо null
Student.prototype = Object.create(Person.prototype);
Student.prototype.sleep = function () {
    return 'ZZZ zzz';
}
Student.prototype.constructor = Student;
var volodya = new Student('Volodya');
assert.equal(volodya.sleep, Student.prototype.sleep);

function Lecturer() { }
Lecturer.prototype = Object.create(Person.prototype);
Lecturer.prototype.constructor = Lecturer;
assert.equal(Lecturer.sleep, undefined);

assert.equal(Student.prototype.isPrototypeOf(volodya), true);
assert.equal(Person.prototype.isPrototypeOf(volodya), true);
assert.equal(Object.prototype.isPrototypeOf(volodya), true);

assert.equal(volodya instanceof Student, true);
assert.equal(volodya instanceof Person, true);
assert.equal(volodya instanceof Object, true);

var foreverAlone = Object.create(null);
assert.equal(foreverAlone instanceof Object, false);
assert.equal(Object.prototype.isPrototypeOf(foreverAlone), false);

function Animal(name) {
    this.name = name;
}
function Cat(name) {
    Animal.call(this, name);
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
assert.equal(new Cat('fluffy').name, 'fluffy');

Student.prototype.getName = function () {
    return 'Student ' + Person.prototype.getName.call(this);
}
assert.equal(new Student('Vasya').getName(), 'Student Vasya');

var personProto = {};
personProto.getName = function () {
    return this.name;
}
var studentProto = Object.create(personProto);
studentProto.sleep = function () { }
studentProto.create = function (name) {
    return Object.create(this, {
        name: { value: name }
    });
}
var student = studentProto.create('Oleg');
assert.equal(student.getName(), 'Oleg');
