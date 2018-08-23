var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to mongoDB
//mongoose.connect('mongodb://192.168.0.221:32769/todo');
mongoose.connect('mongodb://lokilim:loki1014@ds125482.mlab.com:25482/lms_20180821');

mongoose.connection.once('open', function () {
  console.log('Connection has been made.');
}).on('error', function (error) {
  console.log('Connection error: ' + error);
});

//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model('Todo', todoSchema);

/*
var itemOne = Todo({
  item: 'get banana',
}).save(function (err) {
  if (err) throw err;
  console.log('item saved');
});

var data = [{
  item: 'get milk',
}, {
  item: 'hotdog',
}, {
  item: 'kick some coding ass',
}];
*/

var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

module.exports = function (app) {
  app.get('/todo', function (req, res) {
    //get data from mongodb and pass it to view
    //Todo.find({item:'get banana'});
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', {
        todos: data,
      });
    });
  });

  app.post('/todo', urlencodedParser, function (req, res) {
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      console.log('item saved');
      res.json(data);
    });
  });

  app.delete('/todo/:item', function (req, res) {
    //delete the requested item from mongoDB
    Todo.find({
      item: req.params.item.replace(/\-/g, ' '),
    }).remove(function (err, data) {
      if (err) throw err;
      console.log('item deleted');
      res.json(data);
    });
  });

    app.get('/', function (req, res) {
        //get data from mongodb and pass it to view
        //Todo.find({item:'get banana'});
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {
                todos: data,
            });
        });
    });

    app.post('/', urlencodedParser, function (req, res) {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            console.log('item saved');
            res.json(data);
        });
    });

    app.delete('/:item', function (req, res) {
        //delete the requested item from mongoDB
        Todo.find({
            item: req.params.item.replace(/\-/g, ' '),
        }).remove(function (err, data) {
            if (err) throw err;
            console.log('item deleted');
            res.json(data);
        });
    });
};
