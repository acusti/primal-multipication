/* global __WEBPACK__ */
import React from 'react';
import countTo from '../helpers/number-iterator.js';
if (__WEBPACK__) {
    require('../../style/components/MultiplicationTable.less');
}

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
const tableStyles = {
    th: {
        width  : `${dimensions.column.width}px`,
        height : `${dimensions.row.height}px`
    },
    td: {
        width  : `${dimensions.column.width}px`,
        height : `${dimensions.row.height}px`
    },
    tdKey: {
        width  : `${dimensions.columnKey.width}px`,
        height : `${dimensions.row.height}px`
    },
}

class MultiplicationTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Destructuring to set up tableProps as not including primes and primesLength
        const isAbbreviated = this.props.primesLength > this.props.maxTableLength;
        let isScrollableX   = false;
        let isScrollableY   = false;
        const noticeStyle   = {
            display: isAbbreviated ? 'block' : 'none'
        };
        const primeOffset = isAbbreviated ? this.props.primesLength - this.props.maxTableLength : 0;
        const tableLength = this.props.primesLength - primeOffset;
        let outerWidth = dimensions.column.width * tableLength + dimensions.columnKey.width;
        let width = outerWidth;
        if (width > this.props.maxWidth) {
            width = this.props.maxWidth;
            isScrollableX = true;
        }
        let height = dimensions.row.height * (tableLength + 1);
        if (height > this.props.maxHeight) {
            height = this.props.maxHeight;
            isScrollableY = true;
        }
        const primeIndexes   = [ ...countTo({ start : primeOffset, length : tableLength }) ];
        const tableRows      = primeIndexes.map((idxTr) => {
            const primeTr    = this.props.primes[idxTr];
            const tableCells = primeIndexes.map((idxTd) => {
                const primeTd = this.props.primes[idxTd];
                const key = `td${primeTr}_${primeTd}`;
                return (
					<td key={key} style={tableStyles.td}>
                        {primeTr * primeTd}
                    </td>
				);
            });
            const trKey = `tr${primeTr}`;
            const thKey = `th${primeTr}`;
            return (
                <tr key={trKey}>
					<th key={thKey} style={tableStyles.th}>
                        <div className="multiplication-table__tbody__label">
                            {primeTr}
                        </div>
                    </th>
					{tableCells}
				</tr>
            );
        });
        return (
            <div className={ 'multiplication-table' + (isAbbreviated ? ' is-abbreviated' : '') + (isScrollableX ? ' is-scrollable-x' : '') } style={{ width }}>
                <p className="multiplication-table__notice"><strong>Note:</strong> To make the table more manageable, only the largest {this.props.maxTableLength * this.props.maxTableLength} prime products are shown</p>
                <div className={ 'multiplication-table__container' + (isScrollableY ? ' is-scrollable-y' : '') } style={{ height, width: outerWidth }}>
                    <table className="table">
        				<thead>
        					<tr>
                                <th style={tableStyles.tdKey}>
                                    <div className="multiplication-table__thead__label" />
                                </th>
        						{primeIndexes.map((idx) => {
        							return (
                                        <th key={ `thead${this.props.primes[idx]}` } style={tableStyles.tdKey}>
                                            <div className="multiplication-table__thead__label">
                                                { this.props.primes[idx] }
                                            </div>
                                        </th>
                                    );
        						})}
                            </tr>
        				</thead>
        				<tbody>
                            {tableRows}
        				</tbody>
                    </table>
                </div>
            </div>
        );
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
