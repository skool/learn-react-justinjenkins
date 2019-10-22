import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dice from '../Dice/Dice';

const DiceRolling = props => {

    const [seconds, setSeconds] = useState(1);

    useEffect(() => {
        if (props.spin) {
            let interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            },150)

            return () => clearInterval(interval);
        }
    }, [props.spin,seconds]);

    const randomDiceNumber = () => { return Math.floor(Math.random() * 6) + 1; };

    return (
    <span>
        <Dice handleFreezeDice={() => {}} size="sm" number={randomDiceNumber()} spin={props.spin} />        
    </span>
    );

}
DiceRolling.defaultProps = {
    spin: true
};

DiceRolling.propTypes = {
    spin: PropTypes.bool,
}

export default DiceRolling;