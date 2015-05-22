import should from 'turris-test-helpers';

import StateStore from '../src/helpers/state-store.js';

describe('State Store', function() {
	beforeEach(function() {
		StateStore.clear();
	});

	it('Sets and gets strings', function() {
		const stringValue = 'foo';
		StateStore.setItem('stringValue', stringValue);
		StateStore.getItem('stringValue').should.equal(stringValue);
	});

	it('Sets and gets booleans', function() {
		StateStore.setItem('booleanValue', true);
		StateStore.getItem('booleanValue').should.equal(true);
		StateStore.setItem('booleanValue', false);
		StateStore.getItem('booleanValue').should.equal(false);
	});

	it('Sets and gets numbers, NaN, and Infinity', function() {
		const numberValue = -302.505;
		StateStore.setItem('numberValue', numberValue);
		StateStore.getItem('numberValue').should.equal(numberValue);
		const notANumber = NaN;
		StateStore.setItem('notANumber', notANumber);
		StateStore.getItem('notANumber').should.be.eql(notANumber);
		const infiniteNumber = Infinity;
		StateStore.setItem('infiniteNumber', infiniteNumber);
		StateStore.getItem('infiniteNumber').should.equal(infiniteNumber);
	});

	it('Sets and gets arrays of numbers', function() {
		const arrayValue = [2, 3, 5, 7, 11, 13, 17, 19, 23];
		StateStore.setItem('arrayValue', arrayValue);
		StateStore.getItem('arrayValue').should.eql(arrayValue);
	});

	it('Sets and gets object literals', function() {
		const objectValue = {
			isFoo : true,
			bar   : [1, 10, 100, -1],
			obj   : {
				inception: 'Nope'
			}
		};
		StateStore.setItem('objectValue', objectValue);
		StateStore.getItem('objectValue').should.eql(objectValue);
	});

	it('Removes previously set items', function() {
		StateStore.setItem('item', true);
		StateStore.getItem('item').should.equal(true);
		StateStore.removeItem('item');
		should(StateStore.getItem('item')).equal(null);
	});

	it('Clears store when clear is called', function() {
		StateStore.setItem('item', true);
		StateStore.setItem('otherItem', { foo : 'bar' });
		StateStore.getItem('item').should.equal(true);
		StateStore.getItem('otherItem').should.be.ok;
		StateStore.clear();
		should(StateStore.getItem('item')).equal(null);
		should(StateStore.getItem('otherItem')).equal(null);
	});
});
