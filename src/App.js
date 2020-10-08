import React, {useEffect, useState} from 'react';
import Gameboard from './components/Gameboard';
import './assets/styles/reset.css';
import './assets/styles/main.css';

function App() {
  const [isGameOver, setGameOver] = useState(false)
  const [humanTurn, setHumanTurn] = useState(true)
  const [shipHit, setShipHit] = useState("")
  const [cpuCarrierCount, setCpuCarrierCount] = useState(5)
  const [cpuBattleshipCount, setCpuBattleshipCount] = useState(4)
  const [cpuCruiserCount, setCpuCruiserCount] = useState(3)
  const [cpuSubmarineCount, setCpuSubmarineCount] = useState(3)
  const [cpuDestroyerCount, setCpuDestroyerCount] = useState(2)
  const [cpuHealth, setCpuHealth] = useState(17)

  const [carrierCount, setCarrierCount] = useState(5)
  const [battleshipCount, setBattleshipCount] = useState(4)
  const [cruiserCount, setCruiserCount] = useState(3)
  const [submarineCount, setSubmarineCount] = useState(3)
  const [destroyerCount, setDestroyerCount] = useState(2)
  const [health, setHealth] = useState(17)

  //Game Flow

  useEffect(() => {
    startGame()
  })

  const startGame = () => {
    let turnDisplay = document.querySelector('#turn')
    if(isGameOver) {
      alert("game is over you win")
      return
    } else if(humanTurn === true) {
      turnDisplay.innerHTML = "Your Go";
    } else if(humanTurn === false) {
      turnDisplay.innerHTML = "Computers Go";
      setTimeout(computerGo, 1000)
      setHumanTurn(!humanTurn)
    }
    if(cpuHealth === 0) {
      setGameOver(true)
    }
  }

  const computerGo = () => {
    let userCells = document.querySelector('.grid-user').childNodes
    let random = Math.floor(Math.random() * 100)
    if(userCells[random].style.backgroundColor === "black" || userCells[random].style.backgroundColor === "red") {
      computerGo();
      return
    } else if(userCells[random].classList.length === 0) {
      userCells[random].style.backgroundColor = "black"
    } else {
      userCells[random].style.backgroundColor = "red";
      if(userCells[random].classList[1] === "carrier") {
        setCarrierCount(carrierCount - 1)
        checkShipDestroyed(carrierCount, userCells[random].classList[1])
      } else if(userCells[random] === "battleship") {
        setBattleshipCount(battleshipCount - 1)
        checkShipDestroyed(battleshipCount, userCells[random].classList[1])
      } else if(userCells[random] === "cruiser") {
        setCruiserCount(cruiserCount - 1)
        checkShipDestroyed(cruiserCount, userCells[random].classList[1])
      } else if(userCells[random] === "submarine") {
        setSubmarineCount(submarineCount - 1)
        checkShipDestroyed(submarineCount, userCells[random].classList[1])
      } else if(userCells[random] === "destroyer") {
        setDestroyerCount(destroyerCount - 1)
        checkShipDestroyed(destroyerCount, userCells[random].classList[1])
      }
    }
  }

  const markHit = (e) => {
    let cell = e.target;
    if (cell.style.backgroundColor === "black" || cell.style.backgroundColor === "red") {
      return
    } else if(cell.classList[1] === undefined) {
      cell.style.backgroundColor = "black"
    } else {
      cell.style.backgroundColor = "red"
      if(cell.classList[1] === "carrier") {
        setCpuHealth(cpuHealth - 1)
        setCpuCarrierCount(cpuCarrierCount - 1)
        checkShipDestroyed(cpuCarrierCount, cell.classList[1])
      } else if(cell.classList[1] === "battleship") {
        setCpuHealth(cpuHealth - 1)
        setCpuBattleshipCount(cpuBattleshipCount - 1)
        checkShipDestroyed(cpuBattleshipCount, cell.classList[1])
      } else if(cell.classList[1] === "cruiser") {
        setCpuHealth(cpuHealth - 1)
        setCpuCruiserCount(cpuCruiserCount - 1)
        checkShipDestroyed(cpuCruiserCount, cell.classList[1])
      } else if(cell.classList[1] === "submarine") {
        setCpuHealth(cpuHealth - 1)
        setCpuSubmarineCount(cpuSubmarineCount - 1)
        checkShipDestroyed(cpuSubmarineCount, cell.classList[1])
      } else if(cell.classList[1] === "destroyer") {
        setCpuHealth(cpuHealth - 1)
        setCpuDestroyerCount(cpuDestroyerCount - 1)
        checkShipDestroyed(cpuDestroyerCount, cell.classList[1])
      }
    }
    setHumanTurn(!humanTurn)
  }

  const checkShipDestroyed = (count, shipname) => {
    if(count === 1) {
      let info = document.querySelector('#info')
      info.innerHTML = humanTurn === true ? `Enemy ${shipname} destroyed` : `Your ${shipname} was destroyed` 
    } else return
  }

  return (
    <div className="app">
      <Gameboard
      startGame={startGame}
      markHit={markHit} 
      shipHit={shipHit}
      />
    </div>
  );
}

export default App;
