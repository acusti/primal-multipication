/* global describe, it */
/* eslint no-unused-vars: 0 */
// import helpers
import should from 'turris-test-helpers';

// import app
import App from '../src/app.jsx';

describe('App suite', function() {
    it('Should render', function() {
        // const React = this.React;
        // const TestUtils = this.TestUtils;

        // render
        App.start();
        // verify it exists
        document.getElementById('mainContainer').children.length.should.equal(1);
    });
});
