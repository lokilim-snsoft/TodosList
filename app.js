var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//statis files
app.use('/assets', express.static('assets'));

//fire controllers
todoController(app);

//listen to port 3000
app.listen(3000);
console.log('You are listening to port 3000');
