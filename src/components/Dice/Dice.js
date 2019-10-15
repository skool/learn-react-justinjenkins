import React from 'react';
import PropTypes from 'prop-types';
import './Dice.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne,faDiceTwo,faDiceThree,faDiceFour,faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'

const Dice = props => {

    const dice = [
        <FontAwesomeIcon icon={faDiceOne} />,
        <FontAwesomeIcon icon={faDiceTwo} />,
        <FontAwesomeIcon icon={faDiceThree} />,
        <FontAwesomeIcon icon={faDiceFour} />,
        <FontAwesomeIcon icon={faDiceFive} />,
        <FontAwesomeIcon icon={faDiceSix} />,
    ]

    const getDice = (number) => {
        return dice[number-1];
    }

    const diceStateClass = (frozen) => {
        if (frozen) {
            return "frozen";
        }
        return "";
    }; 

    const handleFreezeDice = (func, id) => {
        return func ? func(id) : "";
    };

    return (
    <div id={props.id} className={`dice ${diceStateClass(props.frozen)}`} style={props.style} 
        onClick={() => handleFreezeDice(props.handleFreezeDice, props.id)} >
        {getDice(props.number)}
    </div>
    );

}

Dice.propTypes = {
    frozen: PropTypes.bool,
    handleFreezeDice: PropTypes.func,
    number: PropTypes.number.isRequired,
}

export default Dice;