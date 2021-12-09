const MerkleTree = require("./MerkleTree");
const TransactionList = require("./TransactionList");
const Transaction = require("./Transaction");
const util = require("util");
const sha256 = require("./helper");

let transactionList = new TransactionList();

for (let i= 0; i < 5; i++) {
    transactionList.add(new Transaction(Math.random(), Math.random(), Math.random()));
}

/**
 * Uncomment this section for testing Merkel Tree
 * Uncomment the console log with util to get detailed logs
 */
const tree = new MerkleTree();

tree.createTree(transactionList.list);
console.log(util.inspect(tree, false, null, true /* enable colors */));
tree.verify(transactionList.list[2]);


// Lets tamper the data
transactionList.list[2].to = "asdf";
console.log(util.inspect(transactionList, false, null, true /* enable colors */));
tree.verify(transactionList.list[2]);
