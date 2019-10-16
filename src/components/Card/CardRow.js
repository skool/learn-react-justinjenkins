import React from 'react';
import PropTypes from 'prop-types';
import Dice from '../Dice/Dice';
import { combos } from '../../rules/combinations';

const CardRow = props => {

    const slotName = () => { return props.number ? props.number : props.combo };
    const howTo = () => { return props.combo ? combos[props.combo].howto : "Count and Add only " + props.name; }

    return (    
        <tr style={props.style}>
        <th style={{width: '50px'}}><span style={{width: '120px', display: 'inline-block'}}>{props.name}</span> 
        {props.number ? <Dice style={{lineHeight: '15px', height: '25px'}} number={props.number} /> : ""} </th>
        <td style={{fontSize: "12px"}}>{howTo()}</td>
        <td style={{textAlign: "center"}} onClick={() => props.setSlot(slotName())}>{props.score}</td>
        <td style={{textAlign: "center", opacity: '.25'}}></td>
        <td style={{textAlign: "center", opacity: '.25'}}></td>
        </tr>
    );

}

CardRow.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number,
    combo: PropTypes.string,
    score: PropTypes.number,
    setSlot: PropTypes.func.isRequired,
    style: PropTypes.object,
}

CardRow.defaultProps = {
    style: {}
}

export default CardRow;
