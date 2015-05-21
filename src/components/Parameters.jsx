/* global __WEBPACK__ */
import React from 'react';
import NumberEditor from 'react-number-editor';
if (__WEBPACK__) {
    require('../../style/components/Parameters.less');
}

class Parameters extends React.Component {
    render() {
        return (
            <div className="parameters">
                <label>
                    How many primes do you want to show? <NumberEditor min={1} max={200000} step={1} decimals={0} {...this.props} />
                </label>
                <p className="parameters__help">
                    <span className="glyphicon glyphicon-question-sign"></span> To edit the total: click on the number and drag, click and use the arrow keys, or double click to enter a new number
                </p>
            </div>
        );
    }
}

Parameters.propTypes = {
	initialValue: React.PropTypes.number
};

export default Parameters;
