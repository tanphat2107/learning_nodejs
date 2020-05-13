var express = require('express');
var bodyParser = require('body-parser');
var userRoutes = require('./routers/user.route');
var app = express();
var port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.render('index', {
        name: 'AAA'
    });
})

app.use('/users', userRoutes);


app.listen(port, function() {
    console.log('server listening ' + port)
});