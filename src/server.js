let express = require('express');
let app = express();
let ExpenseController = require('./controllers/ExpenseController');
let bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use( bodyParser.json());

app.use('/expenses', ExpenseController);

app.get('/', (req, res) =>  {
    res.send('hello world');
});

app.listen(3001, () => console.log('Server is started and listening on port 3000!'));


module.exports = app;