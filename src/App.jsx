import { useState} from 'react'
import confetti from 'canvas-confetti'
import Square from './Components/Square'
import Modal from './Components/Modal'
import {TURNS, Winning_Combinations} from './constants'

// import './App.css'

function App() {

const [board, setBoard] = useState(
  ()=>{
    const boardStorage= window.localStorage.getItem('board')
    return boardStorage ? JSON.parse(boardStorage):Array(9).fill(null)
  }
 )
const [turns, setTurns] = useState(
()=>{
    const turnStorage= window.localStorage.getItem('turn')
    return turnStorage ?? TURNS.X
  })
const [winner, setWinner] = useState(null)

 const restartGame=()=>{
  setBoard(Array(9).fill(null))
  setTurns(TURNS.X)
  setWinner(null)
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
} 
 


 const selected_winner=(check_board)=>{

    for(const combination of Winning_Combinations){
     
      const [a,b,c]= combination
  
      if(
        check_board[a]&&
        check_board[a] === check_board[b] &&
        check_board[a] === check_board[c]
        
      ){
  return check_board[a]
      } 
    }
    return null
   }

const checkGame=(newBoard)=>{
  return newBoard.every((square)=>square !== null)
 }


const updateBoard=(index)=>{


if(board[index] || winner) return

 const newBoard= [...board]
 newBoard[index]= turns
 setBoard(newBoard) 


const newturn= turns===TURNS.X ? TURNS.O : TURNS.X
setTurns(newturn)



window.localStorage.setItem('board', JSON.stringify(newBoard))
window.localStorage.setItem('turn', newturn)

const Winner_new = selected_winner(newBoard)
if(Winner_new){
  confetti()
   setWinner(Winner_new)
}else if(checkGame(newBoard)){
  setWinner(false)
}
}



  return (
  <main className='board'>
 <h1>REACT GAME</h1>
 <button onClick={restartGame}>Restart game</button>
 <section className='game'>
  {
    board.map((square, index)=>{
       return(

        <Square key={index} index={index} updateBoard={updateBoard}>
        {square}
      </Square>

       )
    }) 
  }
  </section>

     <section className='turn'>
     <Square isSelected={turns===TURNS.X}>
      {
        TURNS.X
      }
     </Square>
     <Square isSelected={turns===TURNS.O}>
      {
        TURNS.O
      }
     </Square> 
     </section>
     {
      winner!== null &&(
        <Modal winner={winner} restartGame={restartGame}/>
      )
 
     }
    
    </main>
  )
}

export default App
