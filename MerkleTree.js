const sha256 = require("./helper");

class MerkleTree {
  constructor() {
    this.tree = [];
  }

  createTree(transactionList) {
    this.tree.unshift(transactionList);
    this.tree.unshift(transactionList.map(t => t.hash));

    while (this.tree[0].length > 1) {
      let temp = [];

      for (let i = 0; i < this.tree[0].length; i += 2) {
        // 1 개 있는 경우 때문에 i < this.tree[0].length -1 체크 필요
        if (i < this.tree[0].length - 1 && i % 2 === 0) {
          console.log(`left: ${this.tree[0][i]} right: ${this.tree[0][i + 1]} result: ${sha256(this.tree[0][i] + this.tree[0][i + 1])}`);
          temp.push(sha256(this.tree[0][i] + this.tree[0][i + 1]));
        } else {
          temp.push(this.tree[0][i]);
        }
      }

      this.tree.unshift(temp);
    }
  }

  verify(transaction) {
    let position = this.tree[this.tree.length - 1].findIndex(t => t.hash == transaction.hash);
    console.log("Element found at: " + position);
    if (position) {
      let verifyHash = transaction.getHash();

      for (let index = this.tree.length - 2; index > 0; index--) {
        if (position % 2 == 0) {
          const right = this.tree[index][position + 1];
          verifyHash = sha256(verifyHash + right);
        } else {
          const left = this.tree[index][position - 1];
          verifyHash = sha256(left + verifyHash);
        }
        position = Math.floor(position / 2);
      }

      console.log(`result: ${verifyHash}, root: ${this.tree[0][0]}`);
      console.log(verifyHash == this.tree[0][0] ? "Valid" : "Not Valid");
    } else {
      console.log("Data not found with the id");
    }
  }
}

module.exports = MerkleTree;
