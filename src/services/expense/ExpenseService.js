let expenseRepository = require('../../../src/repository/expense/ExpenseRepository');
let Expense = require('../../domain/Expense');

function createExpense(jsonBody) {
    function saveExpense(expense) {
        try {
            expenseRepository.saveExpense(expense);
            return true;
        } catch (e) {
            return false;
        }
    }

    let expense = new Expense(jsonBody.description, jsonBody.value, jsonBody.currency);
    return saveExpense(expense)
}

module.exports = {
    createExpense: createExpense
};



