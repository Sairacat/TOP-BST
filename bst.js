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
}

export {Tree};
