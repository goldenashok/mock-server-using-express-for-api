var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var LoginRes = require('./api/loginres.js');
var Category = require('./api/category_stub.js');

var port = 8085;
if(process.argv.includes('--port', '--p')) {
	port = process.argv[process.argv.indexOf('--port')+1] || process.argv[process.argv.indexOf('--p')+1];
	console.log('port '+port);
}

var context_url = '/api/';

var apiUrlResMap = [
	  {
		url: context_url+'login',
		method: 'get',
		status: 200,
		response: LoginRes.loginres
	  },
	  {
		url: context_url+'accountitems/category',
		method: 'post',
		status: 200,
		response: Category.category_stub
	  }
  ];

apiUrlResMap.forEach(o=>{
  app[o.method](o.url,function(req, res, next){
    res.status(o.status);
    res.send(o.response);
  });
});

app.listen(port, function () {
	console.log('CORS-enabled web server listening on port '+ port)
})