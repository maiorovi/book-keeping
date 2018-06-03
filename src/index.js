let express = require('express');
let app = express();
let ExpenseController = require('./controllers/ExpenseController');
let bodyParser = require('body-parser');


app.use( bodyParser.json());

app.use('/expenses', ExpenseController);

app.get('/', (req, res) =>  {
    res.send('hello world');
});

app.listen(3000, () => console.log('Server is started and listening on port 3000!'));