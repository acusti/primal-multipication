/* global __WEBPACK__ */
import React from 'react';
import FixedDataTable from 'fixed-data-table';
if (__WEBPACK__) {
    require('../../node_modules/fixed-data-table/dist/fixed-data-table.css');
}

const Table  = FixedDataTable.Table;
const Column = FixedDataTable.Column;

class MultiplicationTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table
                className="table multiplication-table"
                rowHeight={35}
                headerHeight={35}
                rowGetter={this.rowGetter.bind(this)}
                rowsCount={this.props.primesLength}
                width={800}
                height={600}>
                    <Column
                        label=""
                        width={40}
                        dataKey={0}
                        fixed={true} />
                {this.props.primes.map((prime, idx) => {
                    return (
                        <Column
                            label={prime}
                            width={50}
                            dataKey={idx + 1} />
                    );
                })}
            </Table>
        );
    }

    getTableData() {
        return this.props.primes.map((prime1) => {
            return this.props.primes.map((prime2) => {
                return prime1 * prime2;
            });
        });
    }

    rowGetter(rowIndex) {
        let prime1 = this.props.primes[rowIndex];
        return [ prime1, ...this.props.primes.map((prime2) => {
            return prime1 * prime2;
        }) ];
    }
}

MultiplicationTable.propTypes = {
	primesLength: React.PropTypes.number,
    primes: React.PropTypes.array
};

export default MultiplicationTable;
