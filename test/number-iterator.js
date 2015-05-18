import numbers from '../src/helpers/number-iterator.js';

describe('Number iterator: ', function() {
	it('Returns an iterator that generates a sequence of numbers with length equal to its first parameter', function() {
		const iterator = numbers(2)[Symbol.iterator]();
		// Starts at 0 with increment defaulting to 1
		iterator.next().value.should.equal(0);
		iterator.next().value.should.equal(1);
		// Length is 2, so iterator is now done
		iterator.next().done.should.equal(true);
	});

	it('Accepts custom increment number as second parameter', function() {
		// Increment by 3
		let iterator = numbers(2, 3)[Symbol.iterator]();
		iterator.next();
		iterator.next().value.should.equal(3);
		// Negative increment
		iterator = numbers(2, -11)[Symbol.iterator]();
		iterator.next();
		iterator.next().value.should.equal(-11);
	});

	it('When used in array spread, returns a sequential array of numbers', function() {
		[...numbers(5)].should.eql([0, 1, 2, 3, 4]);
	});
});
