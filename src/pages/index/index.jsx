import React from 'react';
import {DefaultRoute} from 'react-router';
import Chassis from '../../components/Chassis.jsx';
import PrimalMultiplication from '../../components/PrimalMultiplication.jsx';
import StateStore from '../../helpers/state-store.js';

class IndexPage extends React.Component {
    constructor() {
        super();
        // Initialize state
        this.state = {};
    }

    render() {
        const props = StateStore.getItem('PrimalMultiplication') || {};
        return (
            <Chassis>
                <h1>Multiplication table of prime numbers</h1>
                <PrimalMultiplication { ...props } />
            </Chassis>
        );
    }
}

const IndexRoute = React.createElement(DefaultRoute, {key: 'route_default', handler: IndexPage});

export default IndexRoute;
