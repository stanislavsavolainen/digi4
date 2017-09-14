

function check_number(check_number, session_number) {

	var server_data = 'not defined';

	console.log('check number ' + check_number);
	console.log('session number' +session_number);

	if (check_number == session_number) {
		console.log('Number is equal');
		server_data = 'Number is equal';
		//when client and server number is equal , server generate new random number
		// random_number();
	}

	else {
		if (check_number < session_number) {
			console.log(' Number is biger ');
			server_data = ' Number is biger ';
		}
		else if (check_number > session_number) {
			console.log(' Number is smaller ');
			server_data = ' Number is smaller ';
		}
	}

	return server_data;
}



function generateNewRandomNumber() {
	var max_value = 10;
	var min_value = 1;
	var rnd_number = Math.floor(Math.random() * max_value + min_value);
	return rnd_number;
}



//nodeJS + express server module "http-server"
var express = require('express');
var application = express();
//var body_parser = require('body-parser');
var port = 5658; //5658

//nodeJs express - session
var session = require('express-session');
application.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


application.use(express.static('web_public'));

//----------------------------------------------------

//CORS = cross-origin resouce sharing (allow http-request from other location)
var cors = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	console.log('Using CORS function !');

	next();
};

//express use CORS
application.use(cors);

//new number
application.get('/new', function (req, res) {
	req.session.number = generateNewRandomNumber();

	console.log(' ===> new');

	res.send('New number generated');
});


//guess number
application.get('/guess', function (req, res) {

	var obj = req.query.data1;
	var result = check_number(obj ,  req.session.number);



	console.log( obj + ' ===> guess');

	console.log(' >>>>>>>>>>>>>> '+req.session.number+'<<<<<<<<<<');

	if(result === 'not defined'){
		req.session.number = generateNewRandomNumber();
	}
    
    
	if (result === 'Number is equal') {
		req.session.number = generateNewRandomNumber();
	}

	//  result = "123123";
	res.send(result);
});



function server_init() { console.log('Server started at port : ' + port); }

application.listen(port, server_init); 