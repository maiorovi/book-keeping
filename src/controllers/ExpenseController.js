let express = require('express')
    , router = express.Router()
    , expenseService = require('../services/expense/ExpenseService')
;

router.get("/", function (req, res) {
    expenseService.findAllExpenses(function(result) {
        if(result.isOk()) {
            res.send({data: JSON.stringify(result.params.expenses)});
        } else {
            res.status(500).end();
        }
    });
});

router.post("/", function (req, res) {
    expenseService.createExpense(req.body, function(result) {
        if (result.isOk()) {
            res.set('Location', req.url+'expenses/'+result.params.id);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    });
});

router.delete("/:id", function (req,res) {
    expenseService.deleteExpense(req.params.id , function (result) {
        if (result.isOk()) {
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    })
});

module.exports = router;