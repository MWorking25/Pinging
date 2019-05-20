var express = require('express');
var path = require('path');
var bodypareser = require('body-parser')
var fs = require('fs');
var schedule = require('node-schedule');

const domainPing = require("domain-ping");
const isPortReachable = require('is-port-reachable');
var snmp = require ("net-snmp");

var routes = require('./lib/routes');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(bodypareser.urlencoded({limit:'5mb',extended:true}));
app.use(bodypareser.json({limit:'5mb'}));
	
app.use(express.static(path.join(__dirname,'app')));
routes.configure(app);



var session = new snmp.Session({ host: '172.172.172.3', port: 161, community: 'Threesa321' });
    session.version = 2;

session.get({ oid: 10 }, function (error, varbinds) {
    if (error) {
        console.log('Fail :',error);
    } else {
        console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
    }
});


/* 
var session = snmp.createSession ("172.172.172.228", "Threesa321");

var oids = ["1.3.6.1.2.1.1.5.7.0", "1.3.6.1.2.1.1.6.8.0"];

session.version =2;
session.get (oids, function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]))
            else
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
    }

    // If done, close the session
    session.close ();
});

session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error)
        console.error (error);
});
 */


// io.on('connection', function(socket) {
// 	console.log('new connection');
  
// 	socket.on('Init', function(Devices) {

// 	

	 
// 	});
//   });


// var j = schedule.scheduleJob('*/2 * * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
  
//   var Devices = [{'ip':'103.252.7.5','port':''},{'ip':'103.252.7.25','port':''},{'ip':'172.172.172.126','port':23},{'ip':'172.172.172.228','port':23}]

//   for(var i = 0 ; i < Devices.length;i++)
//   		{
//         console.log(Devices[i]);
//   				if(Devices[i].port == '')
//   				{
//   					domainPing(Devices[i].ip) // Insert the domain you want to ping
//   						.then((res) => {
//   							console.log(Devices[i].ip, res); // Replace with your code
//   						})
//   						.catch((error) => {
//   							console.error(error);
//   						});
//   				}
//   				else
//   				{
             
//   					(async () => {
//   						console.log('IP: ',Devices[i].ip,' PORT: ',Devices[i].port,' ',await isPortReachable(Devices[i].port, {host: Devices[i].ip}));
//   						//=> true
//   					})();
  
//   				}
  		
//   		}

// });


  server.listen(parseInt(process.env.SERVING_PORT), function() {
	console.log('server start on '+ server.address().port+ ' port');
  });





