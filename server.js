var express = require('express');
var path = require('path');
var bodypareser = require('body-parser')
var fs = require('fs');

const domainPing = require("domain-ping");
const isPortReachable = require('is-port-reachable');

var routes = require('./lib/routes');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(bodypareser.urlencoded({limit:'5mb',extended:true}));
app.use(bodypareser.json({limit:'5mb'}));
	
app.use(express.static(path.join(__dirname,'app')));
routes.configure(app);

// io.on('connection', function(socket) {
// 	console.log('new connection');
  
// 	socket.on('Init', function(Devices) {

// 		for(var i = 0 ; i < Devices.length;i++)
// 		{
// 				if(!Devices[i].port)
// 				{
// 					domainPing(Devices.ip) // Insert the domain you want to ping
// 						.then((res) => {
// 							console.log(res); // Replace with your code
// 							Devices[i].status = res;
// 						})
// 						.catch((error) => {
// 							console.error(error);
// 						});
// 				}
// 				else
// 				{
					 
// 					(async () => {
// 						Devices[i].status = await isPortReachable(Devices.port, {host: Devices.ip});
// 						//=> true
// 					})();

// 				}
// 			if(i === Devices.length -1)
// 			{
// 				io.emit('networkSatatus', {
// 					message: 'Status',
// 					Devices_Status: Devices
// 				  });
// 			}
// 		}

	 
// 	});
//   });
  



  server.listen(parseInt(process.env.SERVING_PORT), function() {
	console.log('server start on '+ server.address().port+ ' port');
  });





