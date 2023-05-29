
import React from 'react'
import Square from './Square'


const Modal=({winner, restartGame})=> {
  return (
    <section className='winner'>
    <div>
    <h1>{
      
      winner===false ? 'Tie' : 'You Win!'
      
      }</h1>
      <header className='win'>
        {winner && <Square>{winner}</Square>}
      </header>
    
      <footer>
      <button onClick={restartGame}>Restart game</button>
      </footer>
    </div>
     
      </section>
  )
}

export default Modal