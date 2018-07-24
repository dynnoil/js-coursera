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

var addLeadingZero = function (unit) {
    return unit < 10 ? 0 + String(unit) : unit;
}

var formatDate = function (date) {
    return String(
        date.getFullYear() + '-' +
        addLeadingZero(date.getMonth() + 1) + '-' +
        addLeadingZero(date.getDate()) + ' ' +
        addLeadingZero(date.getHours()) + ':' +
        addLeadingZero(date.getMinutes())
    );
}

var changeDate = function (currentDate, value, unitOfTime) {
    var unitsValues = getUnitsValues(currentDate);
    var date = new Date(
        unitsValues.years,
        unitsValues.months - 1,
        unitsValues.days,
        unitsValues.hours,
        unitsValues.minutes
    );
    switch (unitOfTime) {
        case 'years':
            date.setFullYear(unitsValues.years + value);
            break;
        case 'months':
            date.setMonth(unitsValues.months + value - 1);
            break;
        case 'days':
            date.setDate(unitsValues.days + value);
            break;
        case 'hours':
            date.setHours(unitsValues.hours + value);
            break;
        case 'minutes':
            date.setMinutes(unitsValues.minutes + value);
            break;
    }
    return formatDate(date);
}

/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    return {
        value: date,

        add: function (number, unitOfTime) {
            checkMethodInputs(number, unitOfTime);
            this.value = changeDate(this.value, number, unitOfTime);
            return this;
        },
        subtract: function (number, unitOfTime) {
            checkMethodInputs(number, unitOfTime);
            this.value = changeDate(this.value, -1 * number, unitOfTime);
            return this;
        }
    }
};
