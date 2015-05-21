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
        widthNarrow   : 50,
        widthMedium   : 70,
        widthLarge    : 80,
        widthXXLarge  : 100,
        widthXXXLarge : 110,
    }
};

class MultiplicationTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isAbbreviated = this.props.primesLength > this.props.maxTableLength;
        let isScrollableX   = false;
        let isScrollableY   = false;
        let columnWidth     = dimensions.column.widthNarrow;
        if (this.props.primesLength >= 35000) {
            columnWidth = dimensions.column.widthXXXLarge;
        } else if (this.props.primesLength >= 5000) {
            columnWidth = dimensions.column.widthXXLarge;
        } else if (this.props.primesLength >= 900) {
            columnWidth = dimensions.column.widthXLarge;
        } else if (this.props.primesLength >= 200) {
            columnWidth = dimensions.column.widthLarge;
        } else if (this.props.primesLength > 25) {
            columnWidth = dimensions.column.widthMedium;
        }

        const tableStyles = {
            th: {
                width  : `${columnWidth}px`,
                height : `${dimensions.row.height}px`
            },
            td: {
                width  : `${columnWidth}px`,
                height : `${dimensions.row.height}px`
            },
            tdKey: {
                width  : `${columnWidth - 15}px`,
                height : `${dimensions.row.height}px`
            },
        };
        const primeOffset = isAbbreviated ? this.props.primesLength - this.props.maxTableLength : 0;
        const tableLength = this.props.primesLength - primeOffset;
        // Last columnWidth is for columnKey, which is 10px narrower
        let outerWidth = columnWidth * tableLength + columnWidth - 15;
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
					<th className="multiplication-table__tbody__label" key={thKey} style={tableStyles.tdKey}>
                        {primeTr}
                    </th>
					{tableCells}
				</tr>
            );
        });
        return (
            <div className={ 'multiplication-table' + (isAbbreviated ? ' is-abbreviated' : '') }>
                <p className="multiplication-table__notice"><strong>Note:</strong> To make the table more manageable, only the largest {this.props.maxTableLength * this.props.maxTableLength} prime products are shown</p>
                <div className={ 'multiplication-table__outer-container' + (isScrollableX ? ' is-scrollable-x' : '') } style={{ width }}>
                    <div className={ 'multiplication-table__container' + (isScrollableY ? ' is-scrollable-y' : '') } style={{ height, width: outerWidth }}>
                        <table className="table">
            				<thead style={{ width }}>
            					<tr style={{ width }}>
                                    <th className="multiplication-table__thead__label" style={tableStyles.tdKey}></th>
            						{primeIndexes.map((idx) => {
            							return (
                                            <th className="multiplication-table__thead__label" key={ `thead${this.props.primes[idx]}` } style={tableStyles.th}>
                                                { this.props.primes[idx] }
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
