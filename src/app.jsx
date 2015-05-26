/*eslint camelcase: 0 */
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
// Helpers
import basePath from './helpers/base-path.js';
import analytics from './helpers/analytics.js';

const appInstance = (
    <ReactRouter.Route name="app" path={basePath} handler={App}>
        {routes}
    </ReactRouter.Route>
);

const Bootstrapper = {
    start() {
        ReactRouter.run(appInstance, ReactRouter.HistoryLocation, function(Handler, state) {
            React.render(<Handler />, document.getElementById('mainContainer'));
            analytics.addEvent('pageviews', {
                path   : state.path,
                action : state.action || 'pageload',
                ip_address : '${keen.ip}',
                user_agent : '${keen.user_agent}'
            });
        });
    },
};

export default Bootstrapper;
