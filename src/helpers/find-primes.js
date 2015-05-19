import numbers from './number-iterator.js';

// TODO cache list of primes as they are found
// let cachedPrimes = [];

function findPrimes(length, isSingle = false) {
	const increment = 6;
	let current = 0;
	let isNMinusOne = false;
	let primes = [ ...numbers({ length }) ].map(() => {
		// Exceptions for 2 and 3
		if (current < increment) {
			if (!current) {
				// Increment current to make it not falsy
				current++;
				// First prime is 2
				return 2;
			}
			// Kick off proper counting at 6
			current = increment;
			// Next prime is 3
			return 3;
		}
		let multiple = current;
		let prime    = getPrimes(multiple);
		while (!prime) {
			multiple += increment;
			prime = getPrimes(multiple);
		}
		current = multiple;
		// If we are ready to check the next multiple of 6
		if (!isNMinusOne) {
			current += increment;
		}
		return prime;
	});

	function getPrimes(multiple) {
		let prime = false;
		if (!isNMinusOne) {
			isNMinusOne = true;
			if (isPrime(multiple - 1)) {
				return multiple - 1;
			}
		}
		// Either 6n - 1 just got checked, or it was checked in a previous pass
		if (isNMinusOne) {
			isNMinusOne = false;
			if (isPrime(multiple + 1)) {
				return multiple + 1;
			}
		}
		return prime;
	}

	return isSingle ? primes[primes.length - 1] : primes;
}

export function isPrime(number) {
	if (number < 2) {
		return false;
	}
	if (number === 2 || number === 3) {
		return true;
	}
	// Check for multiples of 2 and 3
	if (number % 2 === 0 || number % 3 === 0) {
		return false;
	}
	// Outside of 2 and 3, all primes take form 6n - 1 or 6n + 1 (where n is any integer)
	// So if number - 1 && number + 1 don't have remainders when divided by 6, can't be prime
	if ((number - 1) % 6 !== 0 && (number + 1) % 6 !== 0) {
		return false;
	}
	const limit = Math.sqrt(number);
	// If the sqrt is an integer (no remainder when divided by 1), it’s not prime
	if (limit % 1 === 0) {
		return false;
	}
	// If it passes those tests, manually verify that it's prime (like 65, 121, 1037, etc.)
	// We only need to check factors of form 6n + or - 1 up to the square root of the number
	// Maximum number of checks needed is (sqrt(number) + 1 [the plus part of + or - 1]) / 6 * 2
	// And all that - 1 because we're starting from 6, not 0
	const length = Math.round((limit + 1) / 3) - 1;
	if (length <= 0) {
		return true;
	}
	// Check all possible prime factors
	return [ ...numbers({start : 6, increment : 6, length})].every(function(possibleFactor) {
		return number % (possibleFactor - 1) !== 0 && number % (possibleFactor + 1) !== 0;
	});
}

export default findPrimes;
