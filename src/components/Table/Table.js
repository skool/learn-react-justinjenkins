import React, { useState } from 'react';
import Dice from '../Dice/Dice';
import Card from '../Card/Card';
import { Button } from 'react-bulma-components';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import './Table.css';

const Table = props => {

    const randomDiceNumber = () => { return Math.floor(Math.random() * 6) + 1; };

    const [diceOnTable, setDice] = useState({
        "1": { id: 1, number: randomDiceNumber(), frozen: false },
        "2": { id: 2, number: randomDiceNumber(), frozen: false },
        "3": { id: 3, number: randomDiceNumber(), frozen: false },
        "4": { id: 4, number: randomDiceNumber(), frozen: false },
        "5": { id: 5, number: randomDiceNumber(), frozen: false },
    });

    const [rollCount, setRollCount] = useState(1);

    const getHotDice = () => {
        return Object.values(diceOnTable).filter(dice => dice.frozen === false);
    };

    const handleRollDice = (e) => {
        if (rollCount < 3) {
            rollDice();
            setRollCount(rollCount+1);
        }
        if (rollCount === 2) {
            Object.values(diceOnTable).forEach((dice) => {
                handleFreezeDice(dice.id);
            });
            setRollCount(0);
        }
    };

    const rollDice = (id) => {
        if (typeof id !== 'undefined') {
            setDice((prevState) => {
                return { ...prevState, [id]: Object.assign(prevState[id], { number: randomDiceNumber() })  }
            });
        } else {
            rollHotDice();
        }
    };

    const rollHotDice = () => {
        const hotDice = getHotDice();
        hotDice.forEach((dice) => {
            rollDice(dice.id);
        });
    };

    const handleFreezeDice = (id) => {
        freezeDice(id,true);
    };

    const freezeDice = (id, state) => {
        setDice((prevState) => {
            return { ...prevState, [id]: Object.assign(prevState[id], { frozen: state })  }
        });
    };

    const resetDice = () => {
        Object.values(diceOnTable).forEach((dice) => {
            freezeDice(dice.id, false);
        });
    };

    const theDice = Object.values(diceOnTable);

    return (
    <div id="table">
        <h1>Yahtzee!</h1>
        <div id="dice-row">
            {theDice.map(dice => {
                // uses the dice in state to generate
                return <Dice id={dice.id} key={dice.id} number={diceOnTable[dice.id].number} handleFreezeDice={handleFreezeDice} frozen={diceOnTable[dice.id].frozen} />
            })}
        </div>
        <div>
        {getHotDice().length ?
            <Button size="large" color="info" onClick={handleRollDice}>Roll Dice</Button> : <h2>Choose a score slot below</h2>
        }
        </div>
        <Card diceOnTable={diceOnTable} resetDice={resetDice} />
    </div>
    );

}

export default Table;
