var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello ');
});
app.get('/dodaj/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    var result = num1 + num2;
    res.send(num1 + ' + ' + num2 + ' = ' + result);
});
app.get('/usun/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    var result = num1 - num2;
    res.send(num1 + ' - ' + num2 + ' = ' + result);
});
app.get('/podziel/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    var result = num1 / num2;
    res.send(num1 + ' / ' + num2 + ' = ' + result);
});
app.get('/pomnoz/:num1/:num2', function (req, res) {
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    var result = num1 * num2;
    res.send(num1 + ' * ' + num2 + ' = ' + result);
});
app.listen(3000);
