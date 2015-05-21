import countTo from '../src/helpers/number-iterator.js';

describe('Number iterator: ', function() {
	it('Returns an iterator that generates a sequence of numbers equal in length to the length property passed in', function() {
		const iterator = countTo({length : 2})[Symbol.iterator]();
		// Starts at 0 with increment defaulting to 1
		iterator.next().value.should.equal(0);
		iterator.next().value.should.equal(1);
		// Length is 2, so iterator is now done
		iterator.next().done.should.equal(true);
	});

	it('Accepts custom increment number (positive or negative) as the increment property', function() {
		// Increment by 3
		let iterator = countTo({length : 2, increment : 3})[Symbol.iterator]();
		iterator.next();
		iterator.next().value.should.equal(3);
		// Negative increment
		iterator = countTo({length : 2, increment : -11})[Symbol.iterator]();
		iterator.next();
		iterator.next().value.should.equal(-11);
	});

	it('Accepts custom starting number as the start property', function() {
		// Start at 7
		const iterator = countTo({start : 7, length : 3, increment : 5})[Symbol.iterator]();
		iterator.next().value.should.equal(7);
		iterator.next().value.should.equal(12);
	});

	it('When used in array spread, returns a sequential array of numbers', function() {
		[...countTo({length : 5}) ].should.eql([0, 1, 2, 3, 4]);
	});

	it('When increment is 2 and start is 3, returns odd numbers from 3 on', function() {
		[ 2, ...countTo({length : 3, start : 3, increment : 2}) ].should.eql([2, 3, 5, 7]);
	});
});
