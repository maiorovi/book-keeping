const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'book-keeping';
let db;

function saveExpense(expense) {
  console.log('saving expense' + expense);
  db.collection('expenses').insertOne(expense);
}

MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
   console.log('Connected successfully to server');

    db = client.db(dbName);
});

const insertDocument = function(db, callback) {

};

module.exports = {
  saveExpense : saveExpense
};

