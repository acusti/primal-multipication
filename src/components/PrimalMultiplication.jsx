import React from 'react';
import Parameters from './Parameters.jsx';
import MultiplicationTable from './MultiplicationTable.jsx';
import findPrimes from '../helpers/find-primes.js';

class PrimalMultiplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.updateParameters(this.props.initialPrimesLength);
    }

    requestParametersUpdate(primesLength) {
        // Debounce updates
        if (this._updateParametersTimeout) {
            window.clearTimeout(this._updateParametersTimeout);
        }
        this._updateParametersTimeout = window.setTimeout(() => {
            this.updateParameters(primesLength);
        }, 250);
    }

    updateParameters(primesLength) {
        let primes;
        if (this.state.tableProps && this.state.tableProps.primesLength === primesLength) {
            primes = this.state.tableProps.primes;
        } else {
            primes = findPrimes(primesLength);
        }
        this.setState({
            tableProps: {
                primes,
                primesLength,
                maxTableLength : this.props.maxTableLength,
                maxWidth       : this.calculateChildDimensions('width'),
                maxHeight      : this.calculateChildDimensions('height')
            }
		});
    }

    componentDidMount() {
        // Force state update on initial mount
        this.readComponentDimensions(true);
    }

    componentDidUpdate() {
        this.readComponentDimensions();
    }

    readComponentDimensions(forceUpdate = false) {
        this._offsetTop = React.findDOMNode(this).offsetTop;
        if (forceUpdate) {
            let tableProps       = this.state.tableProps;
            tableProps.maxWidth  = this.calculateChildDimensions('width');
            tableProps.maxHeight = this.calculateChildDimensions('height');
            this.setState({ tableProps });
        }
    }

    calculateChildDimensions(dimension) {
        let calculated;
        if (dimension === 'width') {
            const container = document.querySelector('.container--primary');
            calculated = container ? container.clientWidth : document.body.clientWidth;
        } else {
            calculated = window.innerHeight - (this._offsetTop || 123) - 50;
        }
        return calculated;
    }

    render() {
        return (
			<div className="primal-multiplication">
                <Parameters onValueChange={this.requestParametersUpdate.bind(this)} initialValue={this.props.initialPrimesLength} />
                <MultiplicationTable {...this.state.tableProps} />
			</div>
		);
	}
}

PrimalMultiplication.propTypes = {
    initialPrimesLength : React.PropTypes.number,
    maxTableLength      : React.PropTypes.number
};
PrimalMultiplication.defaultProps = {
    initialPrimesLength : 10,
    maxTableLength      : 100
};

export default PrimalMultiplication;