class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}


class Tree {
    constructor(arr) {
        this.root = Tree.#buildTree(arr);
    }

    static #buildTree(arr) {
        if(!Array.isArray(arr) || arr.length === 0) return null;
        const preparedArray = [];
        for(let item of arr) {
            if(!preparedArray.includes(item)){
                preparedArray.push(item);
            }
        }
        preparedArray.sort((a, b) => a - b);

        const buildBST = function(start, end) {
            if(start > end) return null;
            let mid = Math.floor((start + end) / 2);
            const root = new Node(preparedArray[mid]);

            root.left = buildBST(start, mid - 1);
            root.right = buildBST(mid + 1, end);

            return root;
        }

        return buildBST(0, preparedArray.length - 1);
    }

    includes(value) {
        let current = this.root;
        while(current !== null) {
            if(current.value === value) return true;
            current = value < current.value ? current.left : current.right;
        }

        return false;
    }

    insert(value) {
        if(this.root === null) {
            this.root = new Node(value);
            return;
        }
        let current = this.root;
        let parent = null;

        while(current !== null) {
            if(current.value === value) return;
            parent = current;
            current = current.value < value ? current.right : current.left;
        }

        if(parent.value > value) {
            parent.left = new Node(value);
        }else {
            parent.right = new Node(value);
        }
    }

    deleteItem(value) {
        if(this.root === null) return;
        let current = this.root;
        let parent = null;
        let nodeWillBeRemoved;

        while(current !== null) {
            if(current.value === value) break;
            parent = current;
            current = value > current.value ? current.right : current.left;
        }

        if(current === null) return;
        nodeWillBeRemoved = current;

        if(nodeWillBeRemoved.left === null && nodeWillBeRemoved.right === null) {
            if(parent === null) {
                this.root = null;
            }else if(parent.value < value) {
                parent.right = null;
            }else {
                parent.left = null;
            }
            return;
        }

        if(nodeWillBeRemoved.right === null) {
            let leftNode = nodeWillBeRemoved.left;
            nodeWillBeRemoved.value = leftNode.value;
            nodeWillBeRemoved.left = leftNode.left;
            nodeWillBeRemoved.right = leftNode.right;
            leftNode.left = null;
            leftNode.right = null;
            return;
        }

        if(nodeWillBeRemoved.left === null) {
            let rightNode = nodeWillBeRemoved.right;
            nodeWillBeRemoved.value = rightNode.value;
            nodeWillBeRemoved.right = rightNode.right;
            nodeWillBeRemoved.left = rightNode.left;
            rightNode.left = null;
            rightNode.right = null;
            return;
        }

        let subTreeRootNode = nodeWillBeRemoved.right;
        let subTreePointer = subTreeRootNode.left;

        if(subTreePointer === null) {
            nodeWillBeRemoved.value = subTreeRootNode.value;
            nodeWillBeRemoved.right = subTreeRootNode.right;
            return;
        }

        while(subTreePointer.left !== null) {
            subTreeRootNode = subTreePointer;
            subTreePointer = subTreePointer.left;
        }

        nodeWillBeRemoved.value = subTreePointer.value;
        subTreeRootNode.left = subTreePointer.right;
        subTreePointer.right = null;
        
    }

    levelOrderForEach(callback) {
        if(this.root === null) return;
        if(typeof callback !== 'function') {
            throw new Error('A callback is required.');
        }

        let rootNode = this.root;
        const queue = [];
        queue.push(rootNode);
        let index = 0;

        while(index < queue.length) {
            const current = queue[index];
            callback(current.value);

            const leftChild = current.left;
            const rightChild = current.right;


            if(leftChild !== null) {
                queue.push(leftChild);
            }

            if(rightChild !== null) {
                queue.push(rightChild);
            }

            index++;
        }

        return 'completed'

    }

    levelOrderForEachRec(callback) {
        if(typeof callback !== 'function') {
            throw new Error('A callback is required');
        }

        const root = this.root;
        const valueArray = [];

        const recForEach = function(node, level = 0) {
            if(node === null) return;
            if(valueArray[level] === undefined) {
                valueArray.push([]);
            }

            valueArray[level].push(node.value);
            recForEach(node.left, level + 1); // level++ will pass the current value of level to the function then increment it, which is not intended.
            recForEach(node.right, level + 1);// same here.
        }

        recForEach(root);

        const flatValueArray = valueArray.flat();
        for(let value of flatValueArray) {
            callback(value);
        }

        return 'completed';
    }

    inOrderForEach(callback) {
        if(typeof callback !== 'function') {
            throw new Error('A callback is required');
        }

        const root = this.root;
        const inOrderRec = function(node) {
            if(node === null) return;

            inOrderRec(node.left);
            callback(node.value);
            inOrderRec(node.right);
        }

        inOrderRec(root);

        return 'completed';
    }

    preOrderForEach(callback) {
        if(typeof callback !== 'function') {
            throw new Error('A callback is required');
        }

        const root = this.root;
        const preOrderRec = function(node) {
            if(node === null) return;

            callback(node.value);
            preOrderRec(node.left);
            preOrderRec(node.right);
        }

        preOrderRec(root);

        return 'completed';
    }

    postOrderForEach(callback) {
        if(typeof callback !== 'function') {
            throw new Error('A callback is required');
        }

        const root = this.root;
        const postOrderRec = function(node) {
            if(node === null) return;

            postOrderRec(node.left);
            postOrderRec(node.right);
            callback(node.value);
        }

        postOrderRec(root);

        return 'completed';
    }

    height(value) {
        if(this.root === null) return;
        let current = this.root;

        while(current !== null) {
            if(current.value === value) break;
            current = current.value < value ? current.right : current.left
        }

        if(current === null) return null;
        let targetNode = current;

        const dive = function(node, level = 0) {
            if(node === null) {
                return level - 1;
            };

            let leftSubTreeHeight = dive(node.left, level + 1);
            let rightSubTreeHeight = dive(node.right, level + 1);

            return leftSubTreeHeight > rightSubTreeHeight ? leftSubTreeHeight : rightSubTreeHeight;
        }

        let height = dive(targetNode);

        return height;

    }

    depth(value) {
        if(this.root === null) return;
        let current = this.root;
        let level = 0;

        while(current !== null) {
            if(current.value === value) return level;
            current = current.value < value ? current.right : current.left;
            level++
        }
    }

    isBalanced() {
        if(this.root === null) return true;

        let isBalanced = true;
        const root = this.root;

        const checkBalance = function(node) {
            if(node === null) return -1;

            let leftSubTreeHeight = checkBalance(node.left);
            let rightSubTreeHeight = checkBalance(node.right);

            if(Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1) {
                isBalanced = false;
            }

            return Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
        }

        checkBalance(root);

        return isBalanced;
    }

    rebalance() {
        if(this.root === null) return;
        const valueArray = [];

        this.inOrderForEach(value => valueArray.push(value));
        
        const balancedTree = Tree.#buildTree(valueArray);
        this.root = balancedTree;
    }

}

export {Tree};
