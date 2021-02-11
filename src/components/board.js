import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css'; 
import Square from './square.js';

class Board extends React.Component {
    
  renderSquare(i) {
      
      return ( 
      <Square key={i} value = { this.props.squares[i] } onClick = {() => this.props.onClick(i) }/>
      );
  }

  render() {
      
      let children = [];
      for (let i = 0; i <= 8; i++) {
          children.push(this.renderSquare(i));
      }
      return ( 
          <div className = "square-wrap" >
              { children.map(item => item) } 
          </div>
      )
  }
};

export default Board;

