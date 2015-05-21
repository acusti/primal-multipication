// Array.from polyfill
import 'core-js/fn/array/from';
// Object.assign polyfill
import 'core-js/es6/object';
// Symbol polyfill
import 'core-js/es6/symbol';
// React
import React from 'react';
import ReactRouter from 'react-router';
// App core
import App from './app/index.js';
// User routes
import routes from './routes.js';

let basePath = '/';
if (window && window.location.href.pathname.indexOf('/primal-multiplication') !== -1) {
    basePath = '/primal-multiplication';
}
const appInstance = (
    <ReactRouter.Route name="app" path={basePath} handler={App}>
        {routes}
    </ReactRouter.Route>
);

const Bootstrapper = {
    start() {
        ReactRouter.run(appInstance, ReactRouter.HistoryLocation, function(Handler) {
            React.render(<Handler />, document.getElementById('mainContainer'));
        });
    },
};

export default Bootstrapper;
