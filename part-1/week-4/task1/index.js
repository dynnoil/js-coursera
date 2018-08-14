/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var result = collection.slice();
    if (arguments.length === 1) {
        return result;
    }
    var operations = [].slice.call(arguments, 1);
    var filterIns = operations.filter(function (operation) {
        return operation.name === 'filterIn';
    });
    var selects = operations.filter(function (operation) {
        return operation.name === 'select';
    });
    filterIns.forEach(function (filterIn) {
        result = filterIn(result);
    });
    selects.forEach(function (select) {
        result = select(result);
    });
    return result;
}

/**
 * @params {String[]}
 */
function select() {
    var properties = [].slice.call(arguments);
    return function select(collection) {
        return collection.map(function (item) {
            var object = {};
            properties.forEach(function (property) {
                if (item.hasOwnProperty(property)) {
                    object[property] = item[property];
                }
            });
            return object;
        });
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(collection) {
        return collection.filter(function (item) {
            return values.indexOf(item[property]) > -1;
        });
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
