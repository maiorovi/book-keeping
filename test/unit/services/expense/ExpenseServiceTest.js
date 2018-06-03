let expect = require('chai').expect;
let sinon = require('sinon');
let expenseService = require('../../../../src/services/expense/ExpenseService');
let expenseRepository = require('../../../../src/repository/expense/ExpenseRepository');
let Expense = require('../../../../src/domain/Expense');

describe('Expense Service', function(){
    let jsonBody = {description : "spent on market", value: 1400, currency: "UAH"};

    beforeEach(function () {

    });

    describe('create expense', function() {
        it('creates expense and returns status', function() {
            let status = expenseService.createExpense(jsonBody);

            expect(status).to.equal(true);
        });

        it('saves expense to repository and returns status', function () {
            let stub = sinon.stub(expenseRepository, 'saveExpense');
            let expectedExpense = new Expense('spent on market', 1400, 'UAH');

            let status = expenseService.createExpense(jsonBody);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, expectedExpense);
            expect(status).to.equal(true);

            stub.restore();
        });

        it('returns false when saving of expense failed', function () {
            let stub = sinon.stub(expenseRepository, 'saveExpense')
                .throws('error');

            let status = expenseService.createExpense(jsonBody);

            sinon.assert.calledOnce(stub);

            expect(status).to.equal(false);
        });
    });
});
