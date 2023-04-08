import { useState } from "react";

function calculateWinner(squares)
{
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i=0; i < lines.length; ++i)
  {
    const [a,b,c] = lines[i]
    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c])
    {
      return {winner: squares[a], squares: lines[i]};
    }
  }
  let draw = squares.indexOf(null) === -1;
  if(draw)
  {
    return {isDraw: draw};
  }
  return null;
  
}

function Square({value, onSquareClick, squareStyle})
{
  return <button 
    className={squareStyle}
    onClick={onSquareClick}>
      {value}
    </button>
}

function BoardRow({squares, colNumber, onBoardClick, winnerSquares})
{
  const col = Array(3).fill(null)

  function handleClick(squareIdx)
  {
    onBoardClick(squareIdx);
  }

  const boardRow = col.map((el, idx) => 
    {
      let squareIdx = idx + col.length * colNumber;
      let squareStyle = winnerSquares && winnerSquares.indexOf(squareIdx) > -1 ? 'square winning' : 'square';
      return <Square
        squareStyle = {squareStyle}
        key={squareIdx} 
        value={squares[squareIdx]} 
        onSquareClick={() => handleClick(squareIdx)}/>
    }
  );

  

  return (
    <>
      <div className='board-row'>
        {boardRow}
      </div>
    </>
  )
}

function Board({xIsNext, squares, onPlay}){

  const rows = Array(3).fill(null);

  function handleBoardClick(squareIdx)
  {
    if(squares[squareIdx] || calculateWinner(squares)) return;

    const nextSquares = squares.slice(); 
    nextSquares[squareIdx] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  status = winner ? winner.isDraw ? "Match ends in a Draw" : "Winner: " + winner.winner : "Next Player: " + (xIsNext ? "X" : "O");

  const board = rows.map((el, idx) => {
    return <BoardRow 
      key={idx} 
      squares={squares} 
      colNumber={idx}
      winnerSquares={winner?.squares} 
      onBoardClick={handleBoardClick}/>
  });

  return (
    <>
      <div className='status'>{status}</div>
      {board}
    </>
  )
}

const calculateMoveLocation= (previousArr, currentArr) => 
{
  if(previousArr.length !== currentArr.length) return null;

  let idx;

  for(let i=0; i < currentArr.length; ++i)
  {
    if(currentArr[i] !== previousArr[i])
    {
      idx = i;
      break;
    }
  }

  return '(' + (parseInt(idx/3) + 1) + ', ' + (idx % 3 + 1) + ')';

}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  function handlePlay(nextSquares)
  {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const handleReorder = () =>
  {
    setIsAscending(!isAscending);
  }

  const jumpTo = (nextMove) =>
  {
    setCurrentMove(nextMove);
    return;
  }

  const moves = history.map( (square, move) => 
    {
      let description;
      let moveIdx = isAscending ? move : history.length -1 - move;
      let moveLocation = moveIdx > 0 ? calculateMoveLocation(history[moveIdx -1],history[moveIdx]) : ''
      description = moveIdx > 0 ? "Go to move #" + moveIdx : "Go to game start";
      return ( <li key={moveIdx}><button className='move-btn' onClick={() => jumpTo(moveIdx)}>{description}</button>{moveLocation}</li>)
    }
  );

  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
        </div>
        <div className='game-info'>
          <div className='game-info-move-number'>
            You are at move #{currentMove}
            <button className='game-info-btn' onClick={handleReorder}>Reorder</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}