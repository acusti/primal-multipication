import React from 'react';
import Parameters from './Parameters.jsx';
import MultiplicationTable from './MultiplicationTable.jsx';
import findPrimes from '../helpers/find-primes.js';
import StateStore from '../helpers/state-store.js';
import analytics from '../helpers/analytics.js';

let componentOffsetTop;

class PrimalMultiplication extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state from props
        this.state = props;
    }

    componentWillMount() {
        this.updateParameters('primesLength', this.props.primesLength);
    }

    requestParametersUpdate(key, newValue) {
        // Debounce updates
        if (this._updateParametersTimeout) {
            window.clearTimeout(this._updateParametersTimeout);
        }
        this._updateParametersTimeout = window.setTimeout(() => {
            this.updateParameters(key, newValue);
        }, 50);
    }

    updateParameters(key, newValue) {
        // Clone current state and merge in updated parameter
        let newState = Object.assign({}, this.state, { [key]: newValue });
        if (this.state && this.state.primesLength === newState.primesLength) {
            newState.primes = this.state.primes;
        } else {
            newState.primes = findPrimes(newState.primesLength);
            // Track user interaction
            analytics.addEvent('parameter-updates', {
                name     : key,
                value    : newValue,
                oldValue : this.state ? this.state[key] : null
            });
        }
        this.setState(Object.assign({}, newState, {
            maxWidth  : this.calculateChildDimensions('width'),
            maxHeight : this.calculateChildDimensions('height')
        }));
        StateStore.setItem('PrimalMultiplication', newState);
    }

    componentDidMount() {
        // Force state update on initial mount
        this.readComponentDimensions(true);
    }

    componentDidUpdate() {
        this.readComponentDimensions();
    }

    readComponentDimensions(forceUpdate = false) {
        componentOffsetTop = React.findDOMNode(this).offsetTop;
        if (forceUpdate) {
            this.setState(Object.assign({}, this.state, {
                maxWidth  : this.calculateChildDimensions('width'),
                maxHeight : this.calculateChildDimensions('height')
            }));
        }
    }

    calculateChildDimensions(dimension) {
        let calculated;
        if (dimension === 'width') {
            const container = document.querySelector('.container--primary');
            calculated = container ? container.clientWidth : document.body.clientWidth;
        } else {
            calculated = window.innerHeight - (componentOffsetTop || 123) - 100;
            // Compensate for note that's shown when primes length exceeds max table length
            if (this.state && this.state.primesLength > this.state.tableLength) {
                calculated = calculated - 35;
            }
        }
        return calculated;
    }

    render() {
        return (
			<div className="primal-multiplication">
                <Parameters onValueChange={this.requestParametersUpdate.bind(this)} initialValue={this.props.initialPrimesLength} />
                <MultiplicationTable {...this.state} />
			</div>
		);
	}
}

PrimalMultiplication.propTypes = {
    primesLength : React.PropTypes.number,
    tableLength    : React.PropTypes.number
};
PrimalMultiplication.defaultProps = {
    primesLength : 10,
    tableLength    : 50
};

export default PrimalMultiplication;
