import React, {useEffect, useState} from 'react';
import Gameboard from './components/Gameboard';
import './assets/styles/reset.css';
import './assets/styles/main.css';

function App() {
  const [isGameOver, setGameOver] = useState(false)
  const [humanTurn, setHumanTurn] = useState()
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
    nextTurn()
  })

  const startGame = () => {
    setHumanTurn(true)
    document.querySelector('.armament-container').style.display = "none"
    document.querySelector('#info').innerHTML = ""
    document.querySelector('#start').style.display = "none"
    document.querySelector('#rotate').style.display = "none"
  }

  const nextTurn = () => {
    let turnDisplay = document.querySelector('#turn')
    if(isGameOver) {
      document.querySelector('#info').innerHTML = (health === 0) ? "Game Over. You Lose" : "Game Over. You Win"
      return
    } else if(humanTurn === true) {
      turnDisplay.innerHTML = "Your Turn";
    } else if(humanTurn === false) {
      turnDisplay.innerHTML = "Computers Turn";
      setTimeout(computerGo, 1000)
    }
    if(cpuHealth === 0) {
      setGameOver(true)
    }
  }

  const computerGo = () => {
    document.querySelector('#info').innerHTML = ""
    let userCells = document.querySelector('.grid-user').childNodes
    let random = Math.floor(Math.random() * 100)
    if(userCells[random].classList.contains('miss') || userCells[random].style.backgroundColor === "#F75263") {
      computerGo();
      return
    } else if(userCells[random].classList.length === 0) {
      userCells[random].style.backgroundColor = "rgb(199 186 186 / 80%)"
      userCells[random].classList.add('miss')
    } else {
      userCells[random].style.backgroundColor = "#F75263";
      if(userCells[random].classList[1] === "carrier") {
        setHealth(health - 1)
        setCarrierCount(carrierCount - 1)
        checkShipDestroyed(carrierCount, userCells[random].classList[1])
      } else if(userCells[random] === "battleship") {
        setHealth(health - 1)
        setBattleshipCount(battleshipCount - 1)
        checkShipDestroyed(battleshipCount, userCells[random].classList[1])
      } else if(userCells[random] === "cruiser") {
        setHealth(health - 1)
        setCruiserCount(cruiserCount - 1)
        checkShipDestroyed(cruiserCount, userCells[random].classList[1])
      } else if(userCells[random] === "submarine") {
        setHealth(health - 1)
        setSubmarineCount(submarineCount - 1)
        checkShipDestroyed(submarineCount, userCells[random].classList[1])
      } else if(userCells[random] === "destroyer") {
        setHealth(health - 1)
        setDestroyerCount(destroyerCount - 1)
        checkShipDestroyed(destroyerCount, userCells[random].classList[1])
      }
    }
    setHumanTurn(!humanTurn)
  }

  const markHit = (e) => {
    let cell = e.target;
    if (cell.style.backgroundColor === "#F75263" || cell.classList.contains('miss')) {
      return
    } else if(cell.classList.length === 0) {
      cell.style.backgroundColor = "rgb(199 186 186 / 80%)"
      cell.classList.add('miss')
    } else {
      cell.style.backgroundColor = "#F75263"
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
      />
    </div>
  );
}

export default App;
