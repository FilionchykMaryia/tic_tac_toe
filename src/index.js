import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//TO DO
//Отображение местоположения для каждого хода в формате (столбец, строка) в списке истории ходов.
//
//Выделите текущий выбранный элемент в списке ходов.
//

//Добавьте кнопку-переключатель, которая позволяет сортировать ходы в порядке возрастания или убывания.
//
//Когда кто-то выигрывает, выделите три квадрата, которые привели к победе.
//



function Square(props) {
    return (
         <button className = "square" onClick = { props.onClick }>
            { props.value }
        </button>
    );
}


class Board extends React.Component {

    renderSquare(i) {
        
        return ( 
            <Square value = { this.props.squares[i] } onClick = {() => this.props.onClick(i) }/>
        );
    }

    render() {
        let children = [];
        for (let i = 0; i <= 8; i++) {
            children.push(this.renderSquare(i));
        }
        return ( 
            <div className = "square-wrap">
                { children.map(item => item) } 
            </div>
        )
    }
}

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
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
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

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        // console.log (squares[winner.lines]);
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
        });

        let status;
        // const squares = this.state.history.squares;
        
        if (winner) {
            status = 'Winner: ' + winner.winner;
            // let [a,b,c] = winner.lines;
            // const squaresWinner = [squares[a], squares[b], squares[c]];
            // console.log(squaresWinner);

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
                <ul className = "game-info-history">{ moves }</ul>    
            </div>
        );
    }
}


// ========================================
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {lines: lines[i], winner: squares[a]};
        }
    }
    return null;
}



ReactDOM.render(<Game />, document.getElementById('root'));