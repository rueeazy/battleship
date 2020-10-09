import React from 'react';

const Cell = (props) => {

    return (
        <div  onClick={props.markHit} id={props.id} className={props.status ? 'taken ' + props.ship  : null}>
        </div>
    )
}

export default Cell