import React from 'react';
import Parameters from './Parameters.jsx';
import MultiplicationTable from './MultiplicationTable.jsx';
import findPrimes from '../helpers/find-primes.js';

class PrimalMultiplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			primesLength: props.initialPrimesLength,
			primes: findPrimes(props.initialPrimesLength)
		};
    }

    updateParameters(primesLength) {
		if (primesLength === this.state.primesLength) {
			return;
		}
        this.setState({
			primesLength,
			primes: findPrimes(primesLength)
		});
    }

    render() {
        return (
			<div className="primal-multiplication">
                <Parameters onValueChange={this.updateParameters.bind(this)} initialValue={this.props.initialPrimesLength} />
                <MultiplicationTable primesLength={this.state.primesLength} primes={this.state.primes} />
			</div>
		);
	}
}

PrimalMultiplication.propTypes = {
	initialPrimesLength: React.PropTypes.number
};
PrimalMultiplication.defaultProps = {
	initialPrimesLength: 10
};

export default PrimalMultiplication;
