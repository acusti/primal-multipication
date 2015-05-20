import React from 'react';
import {DefaultRoute} from 'react-router';
import Chassis from '../../components/Chassis.jsx';
import MultiplicationTable from '../../components/MultiplicationTable.jsx';

class IndexPage extends React.Component {
    constructor() {
        super();
        // init state
        this.state = {
            // your stuff here
        };
    }

    render() {
        return (
            <Chassis>
                <h1>Multiplication table of prime numbers</h1>
                <MultiplicationTable />
            </Chassis>
        );
    }
}

const IndexRoute = React.createElement(DefaultRoute, {key: 'route_default', handler: IndexPage});

export default IndexRoute;
