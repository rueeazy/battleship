import React, {useState} from 'react';
import Cell from './Cell';

const generateCells = () => {
    let divs = [];
    for(let i=0; i<10*10; i++) {
        divs.push({id: i, status: false, ship: ""})
        } 
    return divs
}

const PlayerGrid = (props) => {
    const [cells, setCells] = useState(() => generateCells())

    let playerCellsCopy = cells
    let playerCells = [...playerCellsCopy]

    const drop = (e) => {
        e.preventDefault();
        const ship_id = e.dataTransfer.getData('ship_id');
        const specific_id = e.dataTransfer.getData('specific_id')
        const ship_length = e.dataTransfer.getData('ship_length')

        let ship = document.getElementById(ship_id)
        let shipNameWithLastId = ship.lastChild.id
        let shipClass = shipNameWithLastId.slice(0, -2)
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
        let shipLastId = lastShipIndex + parseInt(e.target.id)
        const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
        const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]

        let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
        let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)
        

        let selectedShipIndex = parseInt(specific_id.substr(-1))

        shipLastId = shipLastId - selectedShipIndex

        if(props.isHorizontal === true && !newNotAllowedHorizontal.includes(shipLastId)) {
            for(let i = 0; i < ship_length; i++) {
                playerCells[parseInt(e.target.id) - selectedShipIndex + i].status = true;
                playerCells[parseInt(e.target.id) - selectedShipIndex + i].ship = shipClass;
            }
        } else if (props.isHorizontal === false && !newNotAllowedVertical.includes(shipLastId)) {
            for(let i = 0; i < ship_length; i++) {
                playerCells[parseInt(e.target.id) - selectedShipIndex + (10*i)].status = true;
                playerCells[parseInt(e.target.id) - selectedShipIndex + (10*i)].ship = shipClass;
            }
        } else return

        setCells(playerCells)
        props.removeShipFromArmament(ship);
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div 
        className={props.grid}
        onDrop={drop}
        onDragOver={dragOver
        }>
            {cells.map(item => {
                return <Cell 
                key={item.id} 
                id={item.id} 
                status={item.status} 
                ship={item.ship} />
            })}
        </div>
    )
}

export default PlayerGrid