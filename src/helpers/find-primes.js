import numbers from './number-iterator.js';

// TODO cache list of primes as they are found
// let cachedPrimes = [];

function findPrimes(length, isSingle = false) {
	let primes = [ ...primeIterator({ length }) ];
	return isSingle ? primes[primes.length - 1] : primes;
}

// Symbol.iterator for generating primes based on 6n +/- 1 factorization
function primeIterator({ length }) {
	if (length === undefined) {
		length = 10;
	}
	const multiple   = 6;
	// Increment from 6n - 1 to 6n + 1
	const increment1 = 2;
	// Increment from 6n + 1 to 6(n+1) - 1
	const increment2 = multiple - 2;
	return {
		[Symbol.iterator] : function() {
			// Initialize our variables
			let count            = 0;
			let candidate        = multiple - 1;
			let isFirstIncrement = true;
			let prime;

			return {
				next : function() {
					let result = {
						done : false
					};
					if (prime === undefined) {
						prime = 2;
					} else if (prime === 2) {
						prime = 3;
					} else {
						let foundPrime = false;
						do {
							foundPrime = isPrime(candidate);
							if (foundPrime) {
								prime = candidate;
							}
							// Increment for next iteration
							candidate += isFirstIncrement ? increment1 : increment2;
							isFirstIncrement = !isFirstIncrement;
						} while (!foundPrime);
					}
					if (count < length) {
						result.value = prime;
					} else {
						result.done = true;
					}
					count++;
					return result;
				}
			};
		}
	};
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
