const expenseRepository = require('../../../src/repository/expense/ExpenseRepository');
const Expense = require('../../domain/Expense');

function createExpense(jsonBody, callback) {
    let expense = new Expense(jsonBody.description, jsonBody.value, jsonBody.currency);

    return expenseRepository.save(expense, callback);
}


function findAllExpenses(callback) {
    expenseRepository.findAll(callback);
}

function deleteExpense(id, callback) {
    expenseRepository.deleteExpense(id, callback);
}

function expenseExists(id, callaback) {
    expenseRepository.expenseExists(id, callaback);
}

function deleteAll(callback) {
    expenseRepository.deleteAll(callback)
}

function update(id, expense, callback) {
    expenseRepository.update(id, expense, callback);
}

module.exports = {
    createExpense: createExpense,
    findAllExpenses : findAllExpenses,
    deleteExpense: deleteExpense,
    expenseExists: expenseExists,
    deleteAll : deleteAll,
    update: update
};



