var assert = require('assert');
var year2016 = require('./year-2016');

assert.equal(year2016.days, 366);
assert.equal(year2016.isLeapYear, true);
assert.equal(year2016.getSelf(), year2016);

var block = {
    innerHeight: 300,

    getHeight: function () {
        return this.innerHeight;
    }
}

assert.equal(block.getHeight(), 300);

var getHeight = block.getHeight;
assert.equal(getHeight(), global.innerHeight);

// Пример заимствования метода
assert.equal(getHeight.call(block), 300);

var arr = [1, 2, 4, 5];
assert.equal(Math.min.apply(Math, arr), 1);

var person = {
    name: 'Sergey',
    items: ['keys', 'phone', 'banana'],

    showItems: function () {
        // var _this = this;

        // return this.items.map(function (item) {
        //     return _this.name + ' has ' + item;
        // });
        // return this.items.map(function (item) {
        //     return this.name + ' has ' + item;
        // }, this); // контекст выполнения передан вторым аргументом
        return this.items.map(function (item) {
            return this.name + ' has ' + item;
        }.bind(this)); // создаем новую ф-ю с переданным контекстом выполнения
    }
}

console.log(person.showItems());

var binPow = Math.pow.bind(Math, 2);
assert.equal(binPow(3), 8)

console.log('OK!');
