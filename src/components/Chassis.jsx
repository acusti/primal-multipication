// react
import React from 'react';
import Navigation from './Navigation.jsx';

class Chassis extends React.Component {
    render() {
        return (
            <div>
                <Navigation />

                <div className="container container--primary">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Chassis;
