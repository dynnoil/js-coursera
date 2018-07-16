// Телефонная книга
var phoneBook = {};

// Возможные команды
var ADD = 'ADD';
var REMOVE_PHONE = 'REMOVE_PHONE';
var SHOW = 'SHOW';

function addContact(name, phones) {
    var phonesList = phones.trim().split(',');
    if (phoneBook.hasOwnProperty(name)) {
        phonesList.forEach(function (phone) {
            if (phoneBook[name].indexOf(phone) === -1) {
                phoneBook[name].push(phone);
            }
        });
    } else {
        phoneBook[name] = phonesList;
    }
}
function removePhone(phoneToRemove) {
    var deletedCount = 0;
    Object.keys(phoneBook).forEach(function (key) {
        var phones = phoneBook[key].filter(function (phone) {
            return phone !== phoneToRemove;
        });
        if (phones.length !== phoneBook[key].length) {
            phoneBook[key] = phones;
            ++deletedCount;
        }
        if (phoneBook[key].length === 0) {
            delete phoneBook[key];
        }
    });
    return !!deletedCount;
}
function showContacts() {
    var result = [];
    function addSpaceBefore(item) {
        return ' ' + item;
    }
    Object.keys(phoneBook).forEach(function (key) {
        if (phoneBook[key].length !== 0) {
            result.push(key + ':' + phoneBook[key].map(addSpaceBefore).toString())
        }
    });
    return result.sort();
}

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    var tokens = command.split(' ');
    var commandName = tokens[0];
    switch (commandName) {
        case ADD:
            var contactName = tokens[1];
            var phoneNumbers = tokens[2];
            return addContact(contactName, phoneNumbers);
        case REMOVE_PHONE:
            var phone = tokens[1];
            return removePhone(phone);
        case SHOW:
            return showContacts();
    }
};
