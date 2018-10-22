var http = require('http');
var url = require('url');

var server = new http.Server();

server.on('request', function (req, res) {
    // req: http.IncomingMessage
    // res: http.ServerResponse
    console.info(req.method);
    console.info(req.headers);
    //var parsedUrl = url.parse(String(req.ulr));
    //console.info(parsedUrl);
    res.end('Hello, User');
});

server.listen(8080);
