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



const inputArray = [12, 37, 66, 78, 66, 23, 49, 52, 9];
const bst = new Tree(inputArray);

console.log(bst.postOrderForEach(logValue));
prettyPrint(bst.root);

function logValue(value) {
  console.log(value)
}
