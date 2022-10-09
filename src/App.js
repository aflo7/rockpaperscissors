// import logo from './logo.svg';
import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [movesLeft, setMovesLeft] = useState()
  const [stats, setStats] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [result, setResult] = useState('')
  const [outcome, setOutcome] = useState('')

  function newGame() {
    setDisabled(false)
    setMovesLeft(3)
    setResult('')
    setOutcome('')
    setStats({
      compScore: 0,
      playerScore: 0
    })
  }

  function computerChoice() {
    const choices = ["rock", "paper", "scissors"]
    return choices[Math.floor(Math.random() * choices.length)]
  } // computer chooses rock, paper, or scissors, and returns that value

  function increasePlayerScore() {
    setStats((stats) => {
      return {
        ...stats,
        playerScore: stats.playerScore + 1
      }
    })
  }

  function increaseCompScore() {
    setStats((stats) => {
      return {
        ...stats,
        compScore: stats.compScore + 1
      }
    })
  }
  function checkOutcome() {
    if (stats.playerScore === stats.compScore) {
      // the game ends in a tie
      setOutcome("You tied the game! Please play again!")
    } else if (stats.playerScore > stats.compScore) {
      setOutcome("YOU WIN the game! with a score of: " + stats.playerScore)
    } else if (stats.compScore > stats.playerScore) {
      setOutcome("COMPUTER WINS the game! with a score of: " + stats.compScore)
    }

    setDisabled(true)
  }


  useEffect(() => {
    // maybe check for winner when there are no moves left?
    if (movesLeft === 0) {
      checkOutcome()
    }
  }, [movesLeft])

  function takeTurn(playerChoice) {
    if (movesLeft === 0) {
      return
    } // you can't take a turn if there are no moves left

    setDisabled(true)
    const compChoice = computerChoice()

    setResult("You chose " + playerChoice + ", Computer chose " + compChoice)

    if (playerChoice === compChoice) {
      // there was a tie, do nothing
    } else if (playerChoice === "rock" && compChoice === "scissors") {
      // rock beats scissors
      // increase playerScore by 1
      increasePlayerScore()
    } else if (playerChoice === "rock" && compChoice === "paper") {
      // paper beats rock
      // increase computer score by 1
      increaseCompScore()
    } else if (playerChoice === "paper" && compChoice === "rock") {
      // paper beats rock
      // increase player score by 1
      increasePlayerScore()
    } else if (playerChoice === "paper" && compChoice === "scissors") {
      // scissors beats paper
      // increase compscore by 1
      increaseCompScore()
    } else if (playerChoice === "scissors" && compChoice === "paper") {
      // scissors beats paper
      // increase player score by 1
      increasePlayerScore()
    } else if (playerChoice === "scissors" && compChoice === "rock") {
      // rock beats scissors
      // increase compScore by 1
      increaseCompScore()
    }
    setMovesLeft(movesLeft - 1)

    setDisabled(false)
  }

  return (
    <div className="App">
      <div className="title">Best of 3 Rock, Paper, Scissors</div>
     
      <div>Moves Left: {movesLeft}</div>
      <button
        onClick={() => {
          takeTurn("rock")
        }}
        disabled={disabled}
      >
        Rock
      </button>
      <button
        onClick={() => {
          takeTurn("paper")
        }}
        disabled={disabled}
      >
        Paper
      </button>
      <button
        onClick={() => {
          takeTurn("scissors")
        }}
        disabled={disabled}
      >
        Scissors
      </button>

      <div>{result}</div>
      <div>{outcome}</div>
      <div>
        <div>Computer Score: {stats.compScore}</div>
        <div>Player Score: {stats.playerScore}</div>
      </div>

      <div>
        <button onClick={newGame}>New Game</button>
      </div>

    
    </div>
  )
}

export default App
