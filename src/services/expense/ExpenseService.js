const expenseRepository = require('../../../src/repository/expense/ExpenseRepository');
const Expense = require('../../domain/Expense');

function createExpense(jsonBody, callback) {
    let expense = new Expense(jsonBody.description, jsonBody.value, jsonBody.currency);

    return expenseRepository.save(expense, callback)
}


function findAllExpenses(callback) {
    expenseRepository.findAll(callback)
}

function deleteExpense(id, callback) {
    expenseRepository.deleteExpense(id, callback)
}

module.exports = {
    createExpense: createExpense,
    findAllExpenses : findAllExpenses,
    deleteExpense: deleteExpense
};



