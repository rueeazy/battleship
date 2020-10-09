import React, {useState, useEffect} from 'react';
import Cell from './Cell';

const generateCells = () => {
    let divs = [];
    for(let i=0; i<10*10; i++) {
        divs.push({id: i, status: false, ship: ""})
        } 
    return divs
}

const ComputerGrid = (props) => {
    useEffect(() => {
        setCount(count + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [width] = useState(10)
    const [cpuCells] = useState(() => generateCells())
    const [count, setCount] = useState(0)

    let cpuDivs = cpuCells;
    let divs = [...cpuDivs]

    const shipsArray = [
        {
            name: 'carrier',
            directions: [
                [0 , 1, 2, 3, 4],
                [0 , 10, 20, 30, 40]
            ]
        },
        {
            name: 'battleship',
            directions: [
                [0 , 1, 2, 3],
                [0 , 10, 20, 30]
            ]
        },
        {
            name: 'cruiser',
            directions: [
                [0 , 1, 2],
                [0 , 10, 20]
            ]
        },
        {
            name: 'submarine',
            directions: [
                [0 , 1, 2],
                [0 , 10, 20]
            ]
        },
        {
            name: 'destroyer',
            directions: [
                [0 , 1],
                [0 , 10]
            ]
        }
    ]

    // Populate random ships for cpu
    const populateCPU = (ship) => {
        let randomDirection = randomNumber();
        let finalShip = ship.directions[randomDirection]; 
        let direction = (randomDirection === 1) ? 1 : 10;
        let randomStart;
        if(randomDirection === 1) {
            randomStart = Math.abs(Math.floor(Math.random() * ((100 - (finalShip.length * width)) + width)))
        } else {
            randomStart = Math.abs(Math.floor(Math.random() * cpuCells.length - (ship.directions[0].length * direction)))
        }
        const isTaken = finalShip.some(index => divs[randomStart + index].status !== false )
        const isAtRightEdge = randomStart + finalShip.length > (Math.ceil((randomStart / 10) + .01) * 10) 

        if(!isTaken && !isAtRightEdge) {
            finalShip.forEach(index => {
                divs[randomStart + index].status = true;
                divs[randomStart + index].ship = ship.name;
            })
        } else {
            populateCPU(ship)
        }
    }

    const randomNumber = () => {
        return Math.floor(Math.random() * 2);
    }

    const paintShips = () => {
        populateCPU(shipsArray[0])
        populateCPU(shipsArray[1])
        populateCPU(shipsArray[2])
        populateCPU(shipsArray[3])
        populateCPU(shipsArray[4])
    }

    if(count < 1) {
        paintShips();
    }

    return (
        <div className={props.grid}>
            {cpuCells.map(item => {
                return <Cell 
                key={item.id} 
                id={item.id} 
                status={item.status} 
                ship={item.ship}
                markHit={props.markHit} 
                />
            })}
        </div>
    )
}

export default ComputerGrid