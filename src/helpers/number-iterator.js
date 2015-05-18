// Number iterator for iterating from 0 to Number
// http://blog.getify.com/iterating-es6-numbers/comment-page-1/#comment-535319

function numberIterator(total, increment = 1) {
	return {
		[Symbol.iterator]: function() {
			var i, count;

			return {
				next: function() {
					if (count === undefined) {
						i = 0;
						count = 1;
						return {
							value: 0,
							done: false
						};
					} else if (count < total) {
						i += increment;
						count++;
						return {
							value: i,
							done: false
						};
					} else {
						return {
							done: true
						};
					}
				}
			};
		}
	};
}

export default numberIterator;
