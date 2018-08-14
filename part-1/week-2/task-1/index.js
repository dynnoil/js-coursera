/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    function isItHashTag(word) {
        return word.startsWith('#');
    }
    function removeHashSign(hashTag) {
        return hashTag.slice(1);
    }
    return tweet
        .split(' ')
        .filter(isItHashTag)
        .map(removeHashSign);
};
