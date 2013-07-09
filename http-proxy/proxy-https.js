var fs = require('fs');
var HttpProxy = require('http-proxy');

var privateKey = fs.readFileSync('*.snipboards.com.key').toString();
var certificate = fs.readFileSync('snipboards.com.crt').toString();
var dad1 = fs.readFileSync('gd_bundle.crt').toString();
var dad2 = fs.readFileSync('gd_bundle.crt').toString();


HttpProxy.createServer({
    https:{
        key: privateKey,
        cert: certificate,
	ca: [dad1, dad2]
    },
    enable : {
    	xforward: true // enables X-Forwarded-For
    },
    //target:{
      //  https:true
    //},
//    hostnameOnly: true,
    router: 'routes.json'
}).listen(3001);

HttpProxy.createServer({ 
	router: 'routes.json',
	enable : {
    		xforward: true // enables X-Forwarded-For
  	}
}).listen(3000);
