// 	bst1	    5
// 		     /     \
//		    3		 7
//		  /   \		/  \
//		 1	   4   6	8
const bst1 = {
    val: 5,
    left: {
        val: 3,
        left: { val: 1 },
        right: { val: 4 },
    },
    right:{
        val: 7,
        left: { val: 6 },
        right: { val: 8 },
    }
}

// 	bst1Mirror  5
// 		     /     \
//		    7		 3
//		  /   \		/  \
//		 8	   6   4	1
const bst1Mirror = {
    val: 5,
    right: {
        val: 3,
        right: { val: 1 },
        left: { val: 4 },
    },
    left: {
        val: 7,
        right: { val: 6 },
        left: { val: 8 },
    }
}

// 	bstBad	    5
// 		     /     \
//		    3		 7
//		  /   \		/  \
//		 4	   4   6	8
const bstBad = {
    val: 5,
    left: {
        val: 3,
        left: { val: 4 },
        right: { val: 4 },
    },
    right:{
        val: 7,
        left:{ val: 6 },
        right:{ val: 8 },
    }
}



class Heap {
	constructor(type) {
		this.type = type === 'min' ? 'min' : 'max';
		this.list = [];
	}

	add(val) {
		this.list.push(val);
		this.heapify(this.list.length - 1);
		// console.log(this.list)
	}
	
	heapify(i) {
		const parentIdx = Math.floor((i - 1) / 2);
		const parent = this.list[parentIdx];
		
		const condition = this.type === 'min' ? this.list[i] < parent : this.list[i] > parent;
		if (parent && condition) {
			const temp = this.list[i];
			this.list[i] = this.list[parentIdx];
			this.list[parentIdx] = temp;
			return this.heapify(parentIdx);
		}
	}

	max() {
		return this.list[0];
	}

}


const data = {
	bst1,
	bst1Mirror,
	bstBad,
	Heap,
}
module.exports = data;