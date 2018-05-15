//load express
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
//Express Middleware
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = (`${now}: ${req.method} ${req.url}`);

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append file.');
		}
	});
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//HTTP Request -JSON Object
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my Website',
	});
});

//HTTP Request - /About page - HTML
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

//HTTP Request - /Bad page - JSON Obj
app.get('/bad', (req, res) => {
	res.send({
		err: 'Request failed.'
	});
});

//port to listen to for local connection
app.listen(port, () =>{
	console.log(`Server running on port ${port}`);
});