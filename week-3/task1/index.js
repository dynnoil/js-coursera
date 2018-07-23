var UNITS_OF_TIME = ['years', 'months', 'days', ' hours', 'minutes'];

var checkUnitOfTime = function (unitOfTime) {
    return /^(years|months|days|hours|minutes)$/im.test(unitOfTime);
}

var checkMethodInputs = function (number, unitOfTime) {
    if (number < 0 || !checkUnitOfTime(unitOfTime)) {
        throw new TypeError('Negative value or Unknown unit of time');
    }
}

var getUnitsValues = function (date) {
    var matchedDate = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/i);
    return {
        years: Number(matchedDate[1]),
        months: Number(matchedDate[2]),
        days: Number(matchedDate[3]),
        hours: Number(matchedDate[4]),
        minutes: Number(matchedDate[5])
    };
}

var wrapDateUnit = function (unit) {
    return unit < 10 ? 0 + String(unit) : unit;
}

var parseDate = function (date) {
    return String(
        date.getFullYear() + '-' +
        wrapDateUnit(date.getMonth()) + '-' +
        wrapDateUnit(date.getDay()) + ' ' +
        wrapDateUnit(date.getHours()) + ':' +
        wrapDateUnit(date.getMinutes())
    );
}

/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var matchedDate = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/i);
    var years = matchedDate[1];
    var months = matchedDate[2];
    var days = matchedDate[3];
    var hours = matchedDate[4];
    var minutes = matchedDate[5];

    return {
        value: date,
        // _years: Number(years),
        // _months: Number(months),
        // _days: Number(days),
        // _hours: Number(hours),
        // _minutes: Number(minutes),

        // fill: function (date) {
        //     UNITS_OF_TIME.forEach(function (unit) {
        //         this[unit] = date[unit];
        //     });
        // },

        add: function (number, unitOfTime) {
            checkMethodInputs(number, unitOfTime);
            var unitsValues = getUnitsValues(this.value);
            var date = new Date(
                unitsValues.years,
                unitsValues.months - 1,
                unitsValues.days,
                unitsValues.hours,
                unitsValues.minutes
            );
            switch (unitOfTime) {
                case 'years':
                    date.setFullYear(unitsValues.years + number);
                    break;
                case 'months':
                    date.setMonth(unitsValues.months + number);
                    break;
                case 'days':
                    date.setDate(unitsValues.days + number);
                    break;
                case 'hours':
                    date.setHours(unitsValues.hours + number);
                    break;
                case 'minutes':
                    date.setMinutes(unitsValues.minutes + number);
                    break;
            }
            this.value = parseDate(date);
            return this;
        },
        subtract: function (number, unitOfTime) {
            checkMethodInputs(number, unitOfTime);
            var unitsValues = getUnitsValues(this.value);
            var date = new Date(
                unitsValues.years,
                unitsValues.months,
                unitsValues.days,
                unitsValues.hours,
                unitsValues.minutes
            );
            switch (unitOfTime) {
                case 'years':
                    date.setFullYear(unitsValues.years - number);
                    break;
                case 'months':
                    date.setMonth(unitsValues.months - number);
                    break;
                case 'days':
                    date.setDate(unitsValues.days - number);
                    break;
                case 'hours':
                    date.setHours(unitsValues.hours - number);
                    break;
                case 'minutes':
                    date.setMinutes(unitsValues.minutes - number);
                    break;
            }
            this.value = parseDate(date);
            return this;
        }
    }
};
