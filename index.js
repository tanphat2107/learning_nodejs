const express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser')
app.set('view engine', 'pug')
app.set('views', './views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write()

//lowDB
users = db.get('users')

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users.value()
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var theMatchedCase = users.value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: theMatchedCase
    });
});

app.get('/users/:id', function(req, res) {
    var id = req.params.id;
    console.log(typeof(id));
    var user = db.get('users').find({ id: id }).value()
    res.render('users/view', {
        user: user
    })
})

app.get('/users/create', function(req, res) {
    res.render('users/create', {
        users: users.value()
    });
});


app.post('/users/create', function(req, res) {
    users.push(req.body).write();
    res.redirect('/users');
});


app.listen(port, function() {
    console.log('server listening ' + port)
});