var express = require('express');
var app = express();
var body = require('body-parser');
var router = require('./javascript/routes.js');
var fs = require('fs');

var handlebars = require('express-handlebars').create({ defaultLayout: 'index' });





app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'))
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use('/', router);





app.listen(port, function(error) {
    if (error) {
        console.log('cannot connect');
    } else {
        console.log("Connected to server");
    }
})