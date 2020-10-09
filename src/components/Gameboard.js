import React, {useState} from 'react';
import PlayerGrid from './PlayerGrid';
import ComputerGrid from './ComputerGrid';
import Ship from './Ship';

const Gameboard = (props) => {
    const [isHorizontal, setHorizontal] = useState(true)

    const rotate = (e) => {
        e.preventDefault()
        setHorizontal(!isHorizontal)
    }

    const removeShipFromArmament = (ship) => {
        let armament = document.querySelector('.armament-container')
        armament.removeChild(ship)
    }

    return (
        <div className="gameboard">
            <div className="title">BattleShip</div>
            <div className="grid-container">
                <PlayerGrid 
                grid="player-grids grid-user"
                isHorizontal={isHorizontal}
                removeShipFromArmament={removeShipFromArmament}
                 />
                <ComputerGrid 
                grid="player-grids grid-cpu"
                markHit={props.markHit}
                />
            </div>
            <div className="hidden-info">
                <button onClick={props.startGame} id="start" className="start">Start Game</button>
                <button  onClick={rotate} id="rotate" className="rotate">Rotate Ships</button>
                <h3 id="turn"> </h3>
                <h3 id="info">Drag & Place Your Ships</h3>
            </div>
            <div className="armament-container">
                <Ship 
                    type="carrier"
                    id="ship-1"
                    length={5}
                    rotation={isHorizontal}
                 />
                <Ship 
                    type="battleship"
                    id="ship-2"
                    length={4}
                    rotation={isHorizontal}
                />
                <Ship 
                    type="cruiser"
                    id="ship-3"
                    length={3}
                    rotation={isHorizontal}
                />
                <Ship 
                    type="submarine"
                    id="ship-4"
                    length={3}
                    rotation={isHorizontal}
                />
                <Ship 
                    type="destroyer"
                    id="ship-5"
                    length={2}
                    rotation={isHorizontal}
                />
            </div>
        </div>
    )
}

export default Gameboard