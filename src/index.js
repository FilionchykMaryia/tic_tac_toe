import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board.js';
import Square from './components/square.js';
import { calculateWinner } from './helpers';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();//копируем массив чтобы не портить исходник
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X'  : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
        
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    // changeColor(winner) {
    //     style: {'border: 2px solid red'}
        
    // }

    counterMoves(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move # ' + move :
                'Go to game start';
            return ( 
                <li key = { move }>
                 <button className="movies" onClick = { () => this.jumpTo(move) }>
                     { desc } 
                 </button> 
                </li>
            );   
        })
        return moves;
    }

    

    render() {
        const moves = this.counterMoves();
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        let status;
        const winner = calculateWinner(current.squares);
    
        if (winner) {
            status = 'Winner: ' + winner.winner;

            let [a,b,c] = winner.lines;
            
            let winnerSquares = [
                current.squares[a],
                current.squares[b],
                current.squares[c],
            ];

            // this.changeColor(winnerSquares);
            // const squares = this.state.history.squares[winner.lines];
            // let squaresWinner = [squares[a], squares[b], squares[c]];
            // console.log(squares);

        } else if (moves.length > 9) {
            status = 'Nobody won, it was a draw!';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return ( 
            <div className = "game">
                <div className = "game-board">
                    <Board squares = { current.squares } onClick = { (i) => this.handleClick(i) } /> 
                </div> 
                <div className = "game-info-title">{ status }</div> 
                <ul className = "game-info-history">{ this.counterMoves() }</ul>    
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));