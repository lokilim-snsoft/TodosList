var mongoose = require('mongoose');

//Connect to mongoDB
mongoose.connect('mongodb://192.168.0.221:32769/todo');
//mongoose.connect('mongodb://lokilim:loki1014@ds125482.mlab.com:25482/lms_20180821');

mongoose.connection.once('open', function () {
    console.log('Connection has been made.');
}).on('error', function (error) {
    console.log('Connection error: ' + error);
});