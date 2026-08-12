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

        let nodeWillBeRemoved;
        let nodeWillBeConnected;
        let subTreeRootPointer;
        let subTreeNextPointer;

        let current = this.root;
        let isGreater = value > current.value;
        let nextPointer = isGreater ? current.right : current.left;

        while(nextPointer !== null) {
            if(nextPointer.value === value) {
                nodeWillBeRemoved = nextPointer;
                nodeWillBeConnected = current;
                break;
            }
            current = nextPointer;
            isGreater = value > current.value;
            nextPointer = isGreater ? current.right : current.left;
        }

        if(nextPointer === null) return;

        if(nodeWillBeRemoved.left === null && nodeWillBeRemoved.right === null) {
            if(isGreater) {
                nodeWillBeConnected.right = null;
            }else {
                nodeWillBeConnected.left = null;
            }
            return;
        }

        if(nodeWillBeRemoved.right === null) {
            subTreeRootPointer = nodeWillBeRemoved.left;
            subTreeNextPointer = subTreeRootPointer.right;

            if(subTreeNextPointer === null) {
                subTreeRootPointer.right = nodeWillBeRemoved.right;
                nodeWillBeRemoved.left = null;
                if(isGreater) {
                    nodeWillBeConnected.right = subTreeRootPointer;
                }else {
                    nodeWillBeConnected.left = subTreeRootPointer;
                }
                return;
            }

            while(subTreeNextPointer.right !== null) {
                subTreeRootPointer = subTreeNextPointer;
                subTreeNextPointer = subTreeNextPointer.right;
            }

            subTreeNextPointer.left = nodeWillBeRemoved.left;
            subTreeNextPointer.right = nodeWillBeRemoved.right;
            subTreeRootPointer.right = null;
            nodeWillBeRemoved.left = null;

            if(isGreater) {
                nodeWillBeConnected.right = subTreeNextPointer;
            }else {
                nodeWillBeConnected.left = subTreeNextPointer;
            }

            return;
        }

        subTreeRootPointer = nodeWillBeRemoved.right;
        subTreeNextPointer = subTreeRootPointer.left;
        if(subTreeNextPointer === null) {
            subTreeRootPointer.left = nodeWillBeRemoved.left;
            nodeWillBeRemoved.right = null;
            if(isGreater) {
                nodeWillBeConnected.right = subTreeRootPointer;
            }else {
                nodeWillBeConnected.left = subTreeRootPointer;
            }
            return;
        }

        while(subTreeNextPointer.left !== null) {
            subTreeRootPointer = subTreeNextPointer;
            subTreeNextPointer = subTreeNextPointer.left;
        }

        subTreeNextPointer.right = nodeWillBeRemoved.right;
        subTreeNextPointer.left = nodeWillBeRemoved.left;
        subTreeRootPointer.left = null;
        nodeWillBeRemoved.right = null;

        if(isGreater) {
            nodeWillBeConnected.right = subTreeNextPointer;
        }else {
            nodeWillBeConnected.left = subTreeNextPointer;
        }



    }
}

export {Tree};
