import { Tree } from "./bst.js";

function returnRandomArray() {
    let length = Math.floor(Math.random() * 21);
    return Array.from({length: length}, () => Math.floor(Math.random() * 100));
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}



const inputArray = returnRandomArray();
const bst = new Tree(inputArray);
console.log(bst.isBalanced());
prettyPrint(bst.root);



bst.insert(121);
bst.insert(101);
bst.insert(382);
bst.insert(385);
bst.insert(311);
console.log(bst.isBalanced());
prettyPrint(bst.root);

bst.rebalance();
console.log(bst.isBalanced());
prettyPrint(bst.root);



