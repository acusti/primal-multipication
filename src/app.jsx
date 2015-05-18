// Core JS Array.from polyfill
import 'core-js/fn/array/from';
// React
import React from 'react';
import ReactRouter from 'react-router';
// App core
import App from './app/index.js';
// User routes
import routes from './routes.js';

const appInstance = (
    <ReactRouter.Route name="app" path="/" handler={App}>
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
