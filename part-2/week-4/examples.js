var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();
emitter.on('log', console.info);
emitter.emit('log', 'Hello!');

emitter.emit('unknown');

emitter.emit('error', 'Hello!');
