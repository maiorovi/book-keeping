let express = require('express')
    , router = express.Router()
    , expenseService = require('../services/expense/ExpenseService')
;

router.get("/", function (req, res) {
    expenseService.findAllExpenses(function(result) {
        if(result.isOk()) {
            res.send(JSON.stringify({expenses: result.params.expenses}));
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
    let id = req.params.id;
    expenseService.expenseExists(id, function (operationResult) {
        if (operationResult.isOk()) {
            expenseService.deleteExpense(id, function (result) {
                if (result.isOk()) {
                    res.status(201).end();
                } else {
                    res.status(500).end();
                }
            });
        } else {
            res.status(404).end();
        }
    });
});

router.delete("/", function (req, res) {
    expenseService.deleteAll(function(operationResult){
        if(operationResult.isOk()) {
            res.status(200).end();
        } else {
            res.status(500).end();
        }
    });
});

router.put("/:id", function (req, res) {
    let id = req.params.id;
    expenseService.expenseExists(id, (result) => {
        if(result.isOk()) {
            let body = req.body;
            expenseService.update(id, body, function(operationResult) {
                if (operationResult.isOk()) {
                    res.send(200).end();
                } else {
                    res.send(500).end();
                }
            });
        } else {
            res.send(404).end();
        }
    });


});

module.exports = router;