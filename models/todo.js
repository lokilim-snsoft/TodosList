var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    item: String,
});

module.exports = mongoose.model('Todo', todoSchema);