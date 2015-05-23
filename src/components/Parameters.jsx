import React from 'react';
import NumberEditor from 'react-number-editor';
if (__WEBPACK__) {
    require('../../style/components/Parameters.less');
}

class Parameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = { className : '' };
    }
    onValueChangeFactory(propName) {
        return (newValue) => {
            this.props.onValueChange(propName, newValue);
            if (this.state[propName + 'ClassName'] === undefined) {
                this.setState({
                    [`${propName}ClassName`] : `is-${propName}-modified`
                });
            }
        };
    }

    render() {
        let componentClassName = 'parameters';
        for (let key in this.state) {
            if (this.state.hasOwnProperty(key) && key.substr(-9) === 'ClassName') {
                componentClassName += ' ' + this.state[key];
            }
        }
        return (
            <div className={componentClassName}>
                <div className="parameters__primes-length">
                    <label>
                        How many primes do you want to generate? <NumberEditor key="input[primesLength]" min={1} max={200000} step={1} decimals={0} initialValue={this.props.initialPrimesLength} onValueChange={this.onValueChangeFactory('primesLength')} />
                    </label>
                    <p className="parameters__help">
                        <span className="glyphicon glyphicon-question-sign"></span> To edit the total: click the number and drag, use keyboard up and down arrows, or double click to enter a new number
                    </p>
                </div>
                <p className="parameters__table-length">
                    <strong>Note:</strong> The table is configured to only show the largest <NumberEditor key="input[tableLength]" min={1} max={100} step={1} decimals={0} initialValue={this.props.initialtableLength} onValueChange={this.onValueChangeFactory('tableLength')} /> primes.
                </p>
            </div>
        );
    }
}

Parameters.propTypes = {
	initialValue: React.PropTypes.number
};

export default Parameters;
