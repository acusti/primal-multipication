/* global __WEBPACK__ */
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import countTo from '../helpers/number-iterator.js';
if (__WEBPACK__) {
    require('../../node_modules/fixed-data-table/dist/fixed-data-table.css');
}

const Table  = FixedDataTable.Table;
const Column = FixedDataTable.Column;
// Fixed table dimensions
const dimensions = {
    row: {
        height: 35
    },
    column: {
        width: 50
    },
    columnKey: {
        width: 40
    }
};

class MultiplicationTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Destructuring to set up tableProps as not including primes and primesLength
        const isAbbreviated = this.props.primesLength > this.props.maxTableLength;
        const noticeStyle   = {
            display: isAbbreviated ? 'block' : 'none'
        };
        const primeOffset = isAbbreviated ? this.props.primesLength - this.props.maxTableLength : 0;
        const tableLength = this.props.primesLength - primeOffset;
        let width = dimensions.column.width * tableLength + dimensions.columnKey.width;
        if (width > this.props.maxWidth) {
            width = this.props.maxWidth;
        }
        let height = dimensions.row.height * (tableLength + 1);
        if (height > this.props.maxHeight) {
            height = this.props.maxHeight;
        }
        const columns = [ ...countTo({ start : primeOffset, length : tableLength }) ].map((primeIdx, idx) => {
            const prime = this.props.primes[primeIdx];
            return (
                <Column
                    label={`${prime}`}
                    width={dimensions.column.width}
                    dataKey={idx + 1} />
            );
        });
        return (
            <div>
                <p style={noticeStyle}><strong>Note:</strong> To make the table more manageable, only the largest 400 prime products are shown</p>
                <Table
                    className="table multiplication-table"
                    rowHeight={dimensions.row.height}
                    headerHeight={dimensions.row.height}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={tableLength}
                    width={width}
                    height={height}>
                        <Column
                            label=""
                            width={dimensions.columnKey.width}
                            dataKey={0}
                            fixed={true} />
                        {columns}
                </Table>
            </div>
        );
    }

    rowGetter(rowIndex) {
        const start  = this.props.primesLength > this.props.maxTableLength ? this.props.primesLength - this.props.maxTableLength : 0;
        const length = this.props.primesLength - start;
        let prime1   = this.props.primes[rowIndex + start];
        let rows     = [ prime1 ];
        [ ...countTo({ start, length }) ].forEach((idx) => {
            rows.push(prime1 * this.props.primes[idx]);
        });
        return rows;
    }
}

MultiplicationTable.propTypes = {
    primes         : React.PropTypes.array,
    primesLength   : React.PropTypes.number,
    maxHeight      : React.PropTypes.number,
    maxWidth       : React.PropTypes.number,
    maxTableLength : React.PropTypes.number
};

export default MultiplicationTable;
