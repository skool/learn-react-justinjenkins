import React from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';
import DiceRolling from './DiceRolling';

const DiceSet = props => {

    const theDice = Object.values(props.diceOnTable);

    return (
        <div id="dice-row">
            {theDice.map(dice => {
                if (props.rolling && !props.diceOnTable[dice.id].frozen) {
                    return <DiceRolling id={dice.id} key={dice.id} />
                }
                return <Dice id={dice.id} key={dice.id} number={props.diceOnTable[dice.id].number} handleFreezeDice={props.handleFreezeDice} frozen={props.diceOnTable[dice.id].frozen} />
            })}
        </div>
    );

}

DiceSet.defaultProps = {
    rolling: false
};

DiceSet.propTypes = {
    diceOnTable: PropTypes.object.isRequired,
    handleFreezeDice: PropTypes.func.isRequired,
    rolling: PropTypes.bool,
}

export default DiceSet;