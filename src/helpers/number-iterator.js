// Number iterator for iterating from 0 to Number
// http://blog.getify.com/iterating-es6-numbers/comment-page-1/#comment-535319

function numberIterator({ length, increment, start }) {
	if (length === undefined) {
		length = 10;
	}
	if (increment === undefined) {
		increment = 1;
	}
	if (start === undefined) {
		start = 0;
	}
	return {
		[Symbol.iterator] : function() {
			let number, count;

			return {
				next : function() {
					if (count === undefined) {
						count  = 1;
						number = start;
						return {
							value : number,
							done  : false
						};
					} else if (count < length) {
						count++;
						number += increment;
						return {
							value : number,
							done  : false
						};
					} else {
						return {
							done : true
						};
					}
				}
			};
		}
	};
}

export default numberIterator;
