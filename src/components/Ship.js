import React, {useState} from 'react';

const Ship = (props) => {
    const [length] = useState(props.length)
    const [health, setHealth] = useState(props.length)

    if(props.ship === props.type) {
    }


    let currentShip;

    const dragStart = (e) => {
        const target = e.target
        let shipLength = target.childNodes.length - 1
        e.dataTransfer.setData('ship_id', target.id);
        e.dataTransfer.setData('specific_id', currentShip)
        e.dataTransfer.setData('ship_length', shipLength)
    }

    const dragOver = (e) => {
        e.stopPropagation();
    }

    const getSpecificId = (e) => {
        currentShip = e.target.id
    }

    let divs = []

    for(let i=0; i<=length; i++) {
        divs.push(<div key={props.type + '-' + i}id={props.type + '-' + i}></div>)
    }

    return (
        <div 
        id={props.id} 
        className={'ship ' + props.type + '-container'  + (props.rotation === false ? '-vertical' : "")} 
        draggable="true"
        onDragStart={dragStart}
        onDragOver={dragOver}
        onMouseDown={getSpecificId}>
            {divs}
        </div>
    )
}

export default Ship