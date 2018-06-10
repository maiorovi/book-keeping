const expect = require('chai').expect;
const sinon = require('sinon');
const expenseService = require('../../../../src/services/expense/ExpenseService');
const expenseRepository = require('../../../../src/repository/expense/ExpenseRepository');
const Expense = require('../../../../src/domain/Expense');
const OperationResult = require('../../../../src/domain/util/OperationResult');

describe('Expense Service', function(){
    let jsonBody = {description : "spent on market", value: 1400, currency: "UAH"};

    beforeEach(function () {

    });

    describe('create expense', function() {
        it('saves expense to repository and returns status', function () {
            let q = function(opresult) {
                expect(opresult).to.include({isSuccess: true, description: 'Item Created'});
            };

            let stub = sinon.stub(expenseRepository, 'saveExpense');
            let expectedExpense = new Expense('spent on market', 1400, 'UAH');

            let expense = expenseService.createExpense(jsonBody, q);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, expectedExpense);
            expect(expense).to.include(jsonBody);

            stub.restore();
        });

        it('returns false when saving of expense failed', function () {
            let stub = sinon.stub(expenseRepository, 'saveExpense')
                .throws('something went wrong');

            let status = expenseService.createExpense(jsonBody);

            sinon.assert.calledOnce(stub);

            expect(status).to.include({isSuccess: false,  description: 'Item Creation failed with reason something went wrong'});

            stub.restore();
        });
    });
});
