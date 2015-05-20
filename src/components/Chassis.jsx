// react
import React from 'react';
import Navigation from './Navigation.jsx';
import MultiplicationTable from './MultiplicationTable.jsx';

class Chassis extends React.Component {
    render() {
        return (
            <div>
                <Navigation />

                <div className="container">
                    <div className="row">
                        {this.props.children}
                        <MultiplicationTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chassis;
