function stackTrace() {

    function toStove() {
        throw new Error('No electricity');
    }
    function prepareCoffee() {
        toStove();
    }
    function toCheerUp() {
        prepareCoffee();
    }
    toCheerUp();
}
// чтобы посмотреть стек вызовов, нужно раскомментировать строку ниже
// stackTrace();

function systemTimers() {

    function toStorve() {
        return 'Поставить на плиту';
    }

    function fromStove() {
        return 'Снять с плиты';
    }

    toStorve();
    // fromStove попадет в очередь событий через 5 секунд
    // и затем в стек вызовов, если он пустой
    setTimeout(fromStove, 5000);

    function toStir() {
        return 'Помешивать';
    }

    // toStir будет выполнена неограниченное кол-во раз каждую секунду,
    // пока системный таймер не очистят
    // каждую секунду toStir будет помещаться в очередь событий
    var id = setInterval(toStir, 1000);

    clearInterval(id);

}

var fs = require('fs');
var filename = __dirname + '/data.json';

// Синхронное чтение файла
console.time('readFileSync');
var data = fs.readFileSync(filename, 'utf-8');
console.timeEnd('readFileSync');
console.info(data);

// Асинхронное чтение файла
fs.readFile(filename, 'utf-8', function (error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
});

var promise = new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf-8', function (err, data) {
        if (err) {
            // refected
            reject(err);
        } else {
            //fulfilled
            resolve(data);
        }
    });
});

promise.then(console.log, console.error);

// Promise chaning

function identity(data) {
    return data;
}

function thrower(err) {
    throw err;
}

promise
    .then(console.log, thrower)
    .then(identity, console.error);

function readFile(name, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(name, encoding, function (err, data) {
            err ? reject(err) : resolve(data);
        })
    })
}

Promise.all([
    readFile(__dirname + '/data.json', 'utf-8'),
    readFile(__dirname + '/ext.json', 'utf-8')
]).then(function (data) {
    console.log(data[0] + data[1]);
});

Promise
    .resolve('{"name": "Leonid"}')
    .then(console.info);

Promise
    .reject(new Error('error'))
    .catch(console.error);