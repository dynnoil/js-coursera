/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    var checkHours = function (hours) {
        return hours >= 0 && hours < 24;
    }
    var checkMinutes = function (minutes) {
        return minutes >= 0 && minutes < 60;
    }
    var formatTime = function (hours, minutes) {
        var format = function (time) {
            return (time < 10) ? '0' + time : time;
        }
        return format(hours % 24) + ':' + format(minutes);
    }
    if (checkHours(hours) && checkMinutes(minutes)) {
        var totalMinutes = (hours * 60) + minutes + interval;
        var resultHours = Math.floor(totalMinutes / 60);
        var resultMinutes = Math.floor(totalMinutes % 60);
        return formatTime(resultHours, resultMinutes);
    }
    throw Error('Время задано некорректно');
};
