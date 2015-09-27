var express = require('express');
var app = express();
var Firebase = require('firebase');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/login', function(request, response) {
	response.render('pages/login');
});

app.post('/login', function(req, res) {
	var ref = new Firebase("https://ilovemarshmellow.firebaseio.com/staff");
	console.log(req.body);
	ref.authWithPassword({
	  email    : req.body.netid + "@nyu.edu",
	  password : req.body.password + ""
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
	});
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


