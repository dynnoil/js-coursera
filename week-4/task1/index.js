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
    var args = [].slice.call(arguments).slice(1);
    var filterIns = args.filter(function (arg) {
        return arg.name === 'filterIn';
    });
    var selects = args.filter(function (arg) {
        return arg.name === 'select';
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
    var fields = [];
    if (arguments.length !== 0) {
        for (var i = 0; i < arguments.length; i++) {
            fields.push(arguments[i]);
        }
    }
    return function select(collection) {
        var result = [];
        collection.forEach(function (item) {
            var object = {};
            fields.forEach(function (field) {
                if (item[field] !== undefined) {
                    object[field] = item[field];
                }
            });
            result.push(object);
        });
        return result;
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(collection) {
        var result = [];
        collection.forEach(function (item) {
            var contains = values.some(function (value, index, array) {
                return item[property] === value;
            });
            if (contains) {
                result.push(item);
            }
        });
        return result;
    }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
