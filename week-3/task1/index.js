var checkUnitOfTime = function (unitOfTime) {
    return /(years|months|days|hours|minutes)/i.test(unitOfTime);
}

var checkMethodInputs = function (number, unitOfTime) {
    if (number < 0 && !checkUnitOfTime(unitOfTime)) {
        throw new TypeError('Unknown unit of time');
    }
}

/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var matchedDate = date.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/);
    // var year = matchedDate[0];
    // var month = matchedDate[1];
    // var day = matchedDate[2];
    // var hours = matchedDate[3];
    // var minutes = matchedDate[4];

    return {
        value: new Date(date),
        matchedDate: date.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/),

        add: function (number, unitOfTime) {
            checkMethodInputs(number, unitOfTime);
            switch (unitOfTime) {
                case 'years':
                    this.value.setYear();
                case 'months':
                    month += number;
                case 'days':
                    day += number;
                case 'hours':
                    ;
                case 'minutes':
                    this.value.setMinutes(this.value.getMinutes() + number);
            }
            return this;
        },
        subtract: function (number, unitOfTime) {
            checkMethodInputs(number, unitOfTime);
            switch (unitOfTime) {
                case 'years':
                    year -= number;
                case 'months':
                    month -= number;
                case 'days':
                    day -= number;
                case 'hours':
                    hours -= number;
                case 'minutes':
                    this.value.setMinutes(this.value.getMinutes() - number);
            }
            return this;
        },
        toString: function () {
            return String(this.value);
        }
    }
};
