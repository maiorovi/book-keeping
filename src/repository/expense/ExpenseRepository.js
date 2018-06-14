const {MongoClient, ObjectId} = require('mongodb');
const assert = require('assert');
const OperationResult = require('../../domain/util/OperationResult');

const url = 'mongodb://localhost:27017';
const dbName = 'book-keeping';
let db;

function save(expense, callback) {
    function saveCallback(err, doc) {
        if (err) {
            callback(new OperationResult(false, 'Item Creation failed with reason ' + err.toString()));
        }

        callback(new OperationResult(true, 'Item Created', {id: doc.ops[0]._id }));
    }

  return db.collection('expenses').insertOne(expense, saveCallback)
}

function findAll(callback) {
    db.collection('expenses').find().toArray().then((docs) => {
            callback(new OperationResult(true, 'Items fetched', {expenses: docs}))
        }, (err) => {
            console.log('error happened ', err);
            callback(new OperationResult(false, 'Can`t execute query' + err.toString()))
        }
    );
}

function deleteExpense(id, callback) {
    const query = { _id: new ObjectId(id) };

    db.collection('expenses').deleteOne(query, function(err, obj) {
        if (err) {
            callback(new OperationResult(false, 'Can`t delete item with id', {id: id, err: err}));
        } else {
            callback(new OperationResult(true, 'Deleted item with id', {id: id}))
        }
    });
}

function expenseExists(id, callback) {
    db.collection('expenses').findOne({_id: new ObjectId(id)}).then((doc) => {
        if (doc) {
            callback(new OperationResult(true, 'exists'));
        } else {
            callback(new OperationResult(false, 'notexists'));
        }
    }, (err) => {
        callback(new OperationResult(false, 'something went wrong', {err: err}))
    })
}

function deleteAll(callback) {
    db.collection('expenses').deleteMany({}).then(
        (commandResult) => callback(new OperationResult(true, 'deleted', {commandResult: commandResult})),
        (err) => callback(new OperationResult(false, 'not deleted', {err: err})))
}

function update(id, expense, callback) {
    db.collection('expenses').updateOne({_id: new ObjectId(id)}, {$set: expense}).then(
        commandResult => callback(new OperationResult(true, 'updated', {commandResult: commandResult})),
        err => callback(new OperationResult(false, 'not updated', {err: err})));
}

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
   console.log('Connected successfully to server');

    db = client.db(dbName);
});

module.exports = {
  save : save,
  findAll : findAll,
  deleteExpense: deleteExpense,
  expenseExists: expenseExists,
  deleteAll: deleteAll,
  update: update
};

