import React, {useState} from 'react';

const Cell = (props) => {
    const [isTaken, setStatus] = useState(props.status)

    return (
        <div  onClick={props.markHit} id={props.id} className={props.status ? 'taken ' + props.ship  : null}>
        </div>
    )
}

export default Cell