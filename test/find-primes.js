import should from 'turris-test-helpers';

import findPrimes from '../src/helpers/find-primes.js';

describe('Find primes', function() {
	it('Returns an array of numbers equal in length to the parameter passed in', function() {
		findPrimes(5).length.should.equal(5);
	});
	it('Returns the 1st 10 primes correctly', function() {
		const tenPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
		findPrimes(10).should.eql(tenPrimes);

	});
});
