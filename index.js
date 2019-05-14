// //http lib
// var httpLib = require('http');

// //file system lib
// var fileSystemLib = require('fs');

// //create server takes and respond to request over the network
// httpLib.createServer((request, response) => {
// 	console.log("handling request for: " + request.url);

// 	//where to find the file on my local system
// 	var filePath = "." + request.url;

// 	//read the file from my system
// 	fileSystemLib.readFile(filePath, function(error, content) {

// 	//respond with the contents of the file
// 	response.end (content, 'utf-8');
// 	});

// //the last 4 number is the port and can be assigned any number
// }).listen(8125);

// console.log('Server running at http://127.0.0.1:8125/');

// //favicon.ico = the icon to site icon on the tab before the title.

var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');