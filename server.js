var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('contactDatabase', ['list']);
var index = require('./routes/index');
var list = require('./routes/list');


var port=3000;

var app= express();

//view Engine
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname, 'client')));


//Body Parser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', list);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(port, function(){
    console.log("The server is running on port 3000");
});