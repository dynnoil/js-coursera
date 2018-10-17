/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    var operationPromises = operations.map(function (operation) {
        return new Promise(function (resolve, reject) {
            operation(function (err, data) {
                err ? reject(err) : resolve(data);
            });
        });
    });
    return Promise.all(operationPromises)
        .then(function (data) { callback(null, data); })
        .catch(function (err) { callback(err); });
};