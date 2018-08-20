var assert = require('assert');

module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this._items = [];
}

/**
 * Провалидировать позицию элемента в коллекции
 * 
 * @param {number} index - позиция элемента в коллекции
 */
Collection.prototype._validPosition = function (index) {
    return index > 0 && index <= this.count();
}

/**
 * Возвращает массив элементов коллекции
 */
Collection.prototype.values = function () {
    return this._items;
};

/**
 * Подсчитывает кол-во элементов в коллекции
 */
Collection.prototype.count = function () {
    return this._items.length;
}

/**
 * Возвращает элемент с определенной позиции
 * (нумерация начинается с единицы, а не нуля).
 * Если позиция не существует, возвращается null.
 * 
 * @param {Number} index 
 */
Collection.prototype.at = function (index) {
    return this._validPosition(index) ? this._items[index - 1] : null;
}

/**
 * Добавляет элемент в коллекцию
 * 
 * @param {*} value 
 */
Collection.prototype.append = function (value) {
    if (value instanceof Collection) {
        this._items = this._items.concat(value.values());
    } else {
        this._items.push(value);
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
Collection.prototype.removeAt = function (index) {
    if (this._validPosition(index)) {
        return !!this._items.splice(index - 1, 1);
    }
    return false;
}

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (values) {
    return Object.create(Collection.prototype, {
        _items: {
            value: values
        }
    });
};
