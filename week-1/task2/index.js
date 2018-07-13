/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    var checkHours = function (hours) {
        return hours >= 0 && hours < 24;
    }
    var checkMinutes = function (minutes) {
        return minutes >= 0 && minutes < 60;
    }
    return checkHours(hours) && checkMinutes(minutes);
};
