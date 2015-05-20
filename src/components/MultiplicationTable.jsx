import React from 'react';

class MultiplicationTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tableRows = this.props.primes.map((prime1) => {
			const tableCells = this.props.primes.map((prime2) => {
                const key = `td${prime1}_${prime2}`;
				return (
					<td key={key}>{prime1 * prime2}</td>
				);
			});
            const trKey = `tr${prime1}`;
            const thKey = `th${prime1}`;
			return (
				<tr key={trKey}>
					<th key={thKey}>{prime1}</th>
					{tableCells}
				</tr>
			);
		});
        return (
            <table className="table multiplication-table">
				<thead>
					<tr>
                        <th></th>
						{this.props.primes.map((prime) => {
                            const key = `thead${prime}`;
							return <th key={key}>{prime}</th>;
						})}
					</tr>
				</thead>
				<tbody>
                    {tableRows}
				</tbody>
            </table>
        );
    }
}

export default MultiplicationTable;
