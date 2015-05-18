import numbers from './number-iterator.js';

// TODO cache list of primes as they are found
// let cachedPrimes = [];

function findPrimes(length) {
	let start;
	let primes = [ ...numbers({ length }) ].map(() => {
		if (start === undefined) {
			// Initialize start at 3 (next pass)
			start = 3;
			// Initialize primes at 2
			return 2;
		}
		let prime = start;
		while (!isPrime(prime)) {
			prime += 2;
		}
		start = prime + 2;
		return prime;
	});
	return primes;
}

export function isPrime(number) {
	if (number < 2) {
		return false;
	}
	// Quick check for even numbers
	if (number !== 2 && number % 2 === 0) {
		return false;
	}
	// We start checking at 3, factor can be maximum 1/3 the number, and we will only check odd numbers
	// Number of factors to check is number / 3 (max 1/3) - 3 (for offset of start: 3) / 2 (odd only)
	const length = Math.round((number / 3 - 2) / 2);
	if (length <= 0) {
		return true;
	}
	// Check all possible odd factors
	return [ ...numbers({start : 3, increment : 2, length})].every(function(possibleFactor) {
		return number % possibleFactor !== 0;
	});
}

export default findPrimes;
