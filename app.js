var express = require('express');
var todoController = require('./controllers/todoController');
var user = require('./models/user');

//establish connection
var dbConnection = require('./services/connection.js');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//statis files
app.use('/assets', express.static('assets'));

//fire controllers
todoController(app);

// create a user a new user
var testUser = new user({
    username: 'lokilim',
    password: 'loki1014'
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

// fetch user and test password verification
    user.findOne({ username: 'lokilim' }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('loki1014', function(err, isMatch) {
            if (err) throw err;
            console.log('loki1014:', isMatch); // -> Password123: true
        });

        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        });
    });
});

//listen to port 3000
app.listen(process.env.PORT || 3000);
console.log('You are listening to port ' + process.env.PORT || 3000);
