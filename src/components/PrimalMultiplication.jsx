import React from 'react';
import MultiplicationTable from './MultiplicationTable.jsx';
import findPrimes from '../helpers/find-primes.js';

class PrimalMultiplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			primesLength: 10,
			primes: findPrimes(10)
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

export default PrimalMultiplication;
