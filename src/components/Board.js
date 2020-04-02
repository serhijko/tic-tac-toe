import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={"square " + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquares(n) {
    let squares = [];
    for (let i = n * 3; i < n * 3 + 3; i++) {
      squares.push(this.renderSquare(i));
    }
    return squares;
  }

  renderRows() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(
        <div key={"row " + i} className="board-row">{this.renderSquares(i)}</div>
      );
    }
    return rows;
  }

  render() {
    return (
      <div>
        {this.renderRows()}
      </div>
    );
  }
}

export default Board;
