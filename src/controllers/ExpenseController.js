let express = require('express')
    , router = express.Router()
    , expenseService = require('../services/expense/ExpenseService')
;

router.get("/", function (req, res) {
    res.send('ExpenseController');
});

router.post("/", function (req, res) {
    let r = expenseService.createExpense(req.body)
    if (r) {
        res.status(201).end();
    } else {
        res.status(501).end();
    }
});

module.exports = router;