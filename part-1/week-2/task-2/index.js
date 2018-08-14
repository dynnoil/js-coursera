/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    function selectUniqueHashTags(acc, hashTag) {
        var lowerCasedHashTag = hashTag.toLowerCase();
        return acc.indexOf(lowerCasedHashTag) === -1
            ? acc.concat(lowerCasedHashTag)
            : acc;
    }
    return hashtags
        .reduce(selectUniqueHashTags, [])
        .join(', ');
};
