import React, { useState, useCallback, useEffect } from 'react';
import Dice from '../Dice/Dice';
import DiceRolling from '../Dice/DiceRolling';
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
    const [cardLocked, setCardLocked] = useState(true);

    const getHotDice = useCallback(() => {
        return Object.values(diceOnTable).filter(dice => dice.frozen === false);
    }, [diceOnTable]);

    const handleRollDice = (e) => {
        if (rollCount < 3) {
            rollDice();
            setRollCount(rollCount+1);
        }
        if (rollCount === 2) {
            Object.values(diceOnTable).forEach((dice) => {
                handleFreezeDice(dice.id);
            });
            //setCardLocked(false);
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
        if (rollCount === 0 || rollCount === 2) {
            freezeDice(id, true);
        } else {
            freezeDice(id);
        }
    };

    const freezeDice = (id, freeze) => {
        const diceTemp = freeze !== undefined ? freeze : !diceOnTable[id].frozen;
        setDice((prevState) => {
            return { ...prevState, [id]: Object.assign(prevState[id], { frozen: diceTemp })  }
        });
    };

    const resetDice = () => {
        Object.values(diceOnTable).forEach((dice) => {
            freezeDice(dice.id, false);
            rollDice(dice.id);
        });
    };

    const theDice = Object.values(diceOnTable);

    useEffect(() => {
        if (getHotDice().length === 0) {
            setCardLocked(false);
        }
    },[getHotDice]);

    return (
    <div id="table">
        <h1>Yahtzee! <DiceRolling /></h1>
        <div id="dice-row">
            {theDice.map(dice => {
                // uses the dice in state to generate
                return <Dice id={dice.id} key={dice.id} number={diceOnTable[dice.id].number} handleFreezeDice={handleFreezeDice} frozen={diceOnTable[dice.id].frozen} />
            })}
        </div>
        <div id="roll-button-row">
        {getHotDice().length ?
            <Button size="large" color="info" onClick={handleRollDice}>Roll Dice</Button> : <h2>Choose a score slot below</h2>
        }
        </div>
        <Card diceOnTable={diceOnTable} resetDice={resetDice} locked={cardLocked} lockCard={setCardLocked} />
    </div>
    );

}

export default Table;
