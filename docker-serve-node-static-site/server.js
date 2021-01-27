var http = require('http');

http.createServer(function(req,res){
	res.write('Hello ppppp');
	res.end();
}).listen(8000);
