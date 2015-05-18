import React from 'react';
import findPrimes from '../helpers/find-primes.js';

const MultiplicationTable = React.createClass({
    render: function() {
		const primes = findPrimes(this.state.totalPrimes);
		const tableRows = primes.map((prime1) => {
			const tableCells = primes.map((prime2) => {
				const product = prime1 * prime2;
				return (
					<td>{product}</td>
				);
			});
			return (
				<tr>
					<th>{prime2}</th>
					{tableCells}
				</tr>
			);
		});
        return (
            <table class="multiplication-table">
				<thead>
					<tr>
						{primes.map((prime) => {
							return <th>{prime}</th>;
						})}
					</tr>
				</thead>
				<tbody>
                	{tableRows}
				</tbody>
            </table>
        );
    },
});

export default Chassis;
