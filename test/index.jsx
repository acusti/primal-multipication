// Import helpers
import should from 'turris-test-helpers';

// Import app
import App from '../src/app.jsx';

// Import other tests
import './number-iterator.js';
import './find-primes.js';

describe('App suite', function() {
    it('Renders the main app container', function() {
        // const React = this.React;
        // const TestUtils = this.TestUtils;

        // render
        App.start();
        // verify it exists
        document.getElementById('mainContainer').children.length.should.equal(1);
    });

    it('Defaults to printing multiplication table for the first 10 primes', function() {
        App.start();

        const multiplicationTable = document.querySelector('.multiplication-table');
        should.exist(multiplicationTable);
        multiplicationTable.querySelectorAll('tbody > tr').length.should.equal(10);
        multiplicationTable.querySelector('tr').querySelectorAll('td').should.equal(10);
    });
});
