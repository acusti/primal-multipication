import numbers from '../src/helpers/number-iterator.js';

describe('Number iterator: ', function() {
	it('Returns an iterator for numbers with a working next method', function() {
		let iterator = numbers(2)[Symbol.iterator]();
		// Starts at 0
		iterator.next().value.should.equal(0);
		iterator.next().value.should.equal(1);
		// Length is 2, so iterator is now done
		iterator.next().done.should.equal(true);

		// Increment by 3
		iterator = numbers(2, 3)[Symbol.iterator]();
		iterator.next();
		iterator.next().value.should.equal(3);
	});
	it('When used in array spread, returns a sequential array of numbers', function() {
		[...numbers(5)].should.eql([0, 1, 2, 3, 4]);
	});
});
