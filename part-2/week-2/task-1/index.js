var assert = require('assert');

module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this.items = [];
}

/**
 * Возвращает массив элементов коллекции
 */
Collection.prototype.values = function () {
    return this.items;
};

/**
 * Подсчитывает кол-во элементов в коллекции
 */
Collection.prototype.count = function () {
    return this.items.length;
}

/**
 * Возвращает элемент с определенной позиции
 * (нумерация начинается с единицы, а не нуля).
 * Если позиция не существует, возвращается null.
 * 
 * @param {Number} index 
 */
Collection.prototype.at = function (index) {
    return this.items[index - 1] ? this.items[index - 1] : null;
}

/**
 * Добавляет элемент в коллекцию
 * 
 * @param {*} value 
 */
Collection.prototype.append = function (value) {
    if (value instanceof Collection) {
        this.items = this.items.concat(value.values());
    } else {
        this.items.push(value);
    }
}

/**
 * Метод удаляет элемент с переданной позиции
 * (нумерация начинается с единицы) и в случае успеха 
 * возвращает true. Если элемента на переданной позиции
 * не существует, то метод возвращает false.
 * 
 * @param {*} itemIndex 
 */
Collection.prototype.removeAt = function (itemIndex) {
    var resultIndex = itemIndex - 1;
    if (resultIndex < 0 || resultIndex > this.items.length) {
        return false;
    }
    this.items = this.items.filter(function (value, index) {
        return index !== resultIndex;
    }, this);
    return true;
}

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (values) {
    return Object.create(Collection.prototype, {
        items: {
            value: values
        }
    });
};
