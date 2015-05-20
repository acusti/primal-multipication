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
                    How many primes do you want to show? <NumberEditor min={1} max={100000} step={1} decimals={0} {...this.props} />
                </label>
            </div>
        );
    }
}

export default Parameters;
