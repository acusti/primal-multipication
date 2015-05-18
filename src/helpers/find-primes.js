import numbers from './number-iterator.js';

function findPrimes(total) {
	const primes = [ ...numbers(total) ].map((number) => {
		// Logic for finding next prime goes here
		return number * 2;
	});
	return primes;
}

export default findPrimes;
