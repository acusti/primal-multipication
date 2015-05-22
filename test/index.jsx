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

        // Render
        App.start();
        // Verify it exists
        document.getElementById('mainContainer').children.length.should.equal(1);
    });

    it('Defaults to printing multiplication table for the first 10 primes with vertical and horizontal headings', function() {
        // const TestUtils = this.TestUtils;
        App.start();

        const multiplicationTable = document.querySelector('.multiplication-table');
        should.exist(multiplicationTable);
        multiplicationTable.querySelectorAll('tbody > tr').length.should.equal(10);
        multiplicationTable.querySelector('tbody > tr').querySelectorAll('td').length.should.equal(10);
        // Check for headings: should have thead, and length should be 11 (includes vertical table headings)
        multiplicationTable.querySelectorAll('thead th').length.should.equal(11);
        multiplicationTable.querySelector('tbody > tr > :first-child').nodeName.toLowerCase().should.equal('th');
    });
});
