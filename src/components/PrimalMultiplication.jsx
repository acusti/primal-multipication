import React from 'react';
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

    render() {
        return (
			<div className="primal-multiplication">
				<MultiplicationTable primesLength={this.state.primesLength} primes={this.state.primes} />
			</div>
		);
	}
}

PrimalMultiplication.defaultProps = {
	initialPrimesLength: 10
};

export default PrimalMultiplication;
