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

    #getMin(node) {
        while(node.left !== null) {
            node = node.left;
        }

        return node;
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
        if(current.value === value) return;
        let isGreater = current.value < value
        let nextPointer = isGreater ? current.right : current.left;

        while(nextPointer !== null) {
            current = nextPointer;
            if(current.value === value) return;
            isGreater = current.value < value;
            nextPointer = isGreater ? current.right : current.left;
        }

        if(isGreater) {
            current.right = new Node(value);
        }else {
            current.left = new Node(value);
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
}

export {Tree};
