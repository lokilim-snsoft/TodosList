var bodyParser = require('body-parser');
var Todo = require('../models/todo.js');

var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

module.exports = function (app) {
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
