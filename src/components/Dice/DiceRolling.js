import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dice from '../Dice/Dice';

const DiceRolling = (spin) => {

    const [seconds, setSeconds] = useState(1);

    useEffect(() => {
        if (spin.spin) {
            let interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            },150)

            return () => clearInterval(interval);
        }
    }, [spin,seconds]);

    const randomDiceNumber = () => { return Math.floor(Math.random() * 6) + 1; };

    return (
    <span>
        <Dice handleFreezeDice={() => {}} size="sm" number={randomDiceNumber()} spin={spin} />        
    </span>
    );

}

DiceRolling.propTypes = {
    spin: PropTypes.bool,
}

export default DiceRolling;