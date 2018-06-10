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
            console.log('error happened ', err)
            callback(new OperationResult(false, 'Can`t execute query' + err.toString()))
        }
    );
}

function deleteExpense(id, callback) {
    const query = { _id: new ObjectId(id) };

    db.collection('expenses').deleteOne(query, function(err, obj) {
        if (err) {
            callback(new OperationResult(false, 'Can`t delete item with id', id, err));
        } else {
            callback(new OperationResult(true, 'Deleted item with id', id))
        }
    });
}

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
   console.log('Connected successfully to server');

    db = client.db(dbName);
});

module.exports = {
  save : save,
  findAll : findAll,
  deleteExpense: deleteExpense
};

