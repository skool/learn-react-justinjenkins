import React from 'react';
import PropTypes from 'prop-types';
import Dice from '../Dice/Dice';

const CardRow = props => {

    return (    
        <tr>
        <th style={{width: '50px'}}><span style={{width: '55px', display: 'inline-block'}}>{props.name}</span> <Dice style={{lineHeight: '15px', height: '25px'}} number={props.number} /></th>
        <td style={{fontSize: "12px"}}>Count and Add only {props.name}</td>
        <td style={{textAlign: "center"}} onClick={() => props.setSlot(props.number)}>{props.score}</td>
        <td style={{textAlign: "center"}}></td>
        <td style={{textAlign: "center"}}></td>
        </tr>
    );

}

CardRow.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    score: PropTypes.number,
    setSlot: PropTypes.func.isRequired,
}

export default CardRow;
