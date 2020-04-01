import React from 'react';
import Board from './Board';
import calculateWinner from '../helpers/calculateWinner';
import calculatePosition from '../helpers/calculatePosition';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? '❌' : '⭕';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const coord = move ? calculatePosition(step.squares, history[move - 1].squares) : null;
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      const pos = move
        ? ' ' + coord.player + ' to col ' + coord.col + ' to row ' + coord.row
        : null;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          {pos}
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? '❌' : '⭕');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
