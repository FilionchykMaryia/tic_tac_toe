import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';


function Square(props) {
  //меняем цвет в зависимости от value
  let className = 'square';
  (props.value == 'X') ? (className += ' x') : (className += ' o');
  // const winner = calculateWinner(current.squares);
  // if(winner){
  //     let [a,b,c] = winner.lines;
  // }
  
 
  return (
      <button className = { className }  onClick = { props.onClick }>
          { props.value }
      </button>
  );
};

export default Square;