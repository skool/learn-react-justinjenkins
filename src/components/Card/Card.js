import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardRow from './CardRow';
import { cardDefinition } from './cardDefinition';
import { Table } from 'react-bulma-components';
import * as combinations from '../../rules/combinations';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import './Card.css';

const Card = props => {

    // should we use useReducer instead ?
    const [card, setCard] = useState(cardDefinition);

    useEffect(() => {
        if (isRegionSlotsFull("top")) {
            setSlot("totalTopRows", addUpSlots("top"));
        }
        if (isRegionSlotsFull("bottom")) {
            setSlot("totalBottomRows", addUpSlots("bottom"));
        }
        if (card.totalTopRows.score && card.totalBottomRows.score) {
            setSlot("totalGrand", card.totalTopRows.score+card.totalBottomRows.score);
        }
    });

    const isRegionSlotsFull = (region) => {
        return (!Object.values(card).filter(slot => slot.region === region && slot.score === null).length);
    };

    const getRegionSlots = (region) => {
        return Object.values(card).filter(slot => slot.region === region);
    };

    const addUpSlots = (region) => {
        const slots = getRegionSlots(region);
        const add = (total,slot) => !isNaN(total.score) ? total.score+slot.score : total+slot.score;            
        const total = slots.reduce(add);
        return total;
    };

    const getDiceOrdered = (diceOnTable) => {
        return Object.values(diceOnTable).map(dice => dice.number).sort();
    };

    const setSlot = (slot, score) => {
        if (card[slot].score === null) {
            score = (score ? score : getScore(slot));
            const newScore = { score: score };

            setCard((prevState) => {
                return { ...prevState, [slot]: Object.assign(prevState[slot], newScore) };
            });

            props.resetDice();
        }
    }

    const getScore = (slot) => {
        const dice = getDiceOrdered(props.diceOnTable);
        return isNaN(slot) ? combinations.determinePoints(slot, dice) : combinations.determinePoints("number", dice, slot);
    }

    const topSlots = Object.values(getRegionSlots("top"));
    const bottomSlots = Object.values(getRegionSlots("bottom"));

    return (
    <div id="card">
        <Table className="is-bordered">
            <thead>
                <tr>
                <th style={{textTransform:'uppercase', width: '100px'}}>Upper Section</th>
                <th style={{textTransform:'uppercase', width: '100px'}}>How to Score</th>
                <th style={{textTransform:'uppercase', width: '50px', textAlign: 'center'}}>Game #1</th>
                <th style={{textTransform:'uppercase', width: '50px', textAlign: 'center', opacity: '.25'}}>Game #2</th>
                <th style={{textTransform:'uppercase', width: '50px', textAlign: 'center', opacity: '.25'}}>Game #3</th>        
                </tr>
            </thead>
            <tbody>
            {topSlots.map(slot => {
                return <CardRow key={slot.name} name={slot.name} number={slot.number} score={card[slot.number].score} setSlot={setSlot} />
            })}
            <tr>
                <th style={{textTransform:'uppercase', width: '200px'}}>Upper Total Score</th>
                <td> -></td>
                <td style={{fontWeight:'bold', textAlign: 'center'}}>{card.totalTopRows.score}</td>
                <td></td>
                <td></td>
            </tr>
            {bottomSlots.map(slot => {
                return <CardRow key={slot.name} name={slot.name} combo={slot.combo} score={card[slot.combo].score} setSlot={setSlot} />
            })}
            <tr>
                <th style={{textTransform:'uppercase', width: '200px'}}>Lower Total Score</th>
                <td> -></td>
                <td style={{fontWeight:'bold', textAlign: 'center'}}>{card.totalBottomRows.score}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th style={{textTransform:'uppercase', width: '200px'}}>Grand Total</th>
                <td> -></td>
                <td style={{fontWeight:'bold', textAlign: 'center'}}>{card.totalGrand.score}</td>
                <td></td>
                <td></td>
            </tr>

            </tbody>
        </Table>

    </div>
    );

}

Card.propTypes = {
    diceOnTable: PropTypes.object.isRequired,
    resetDice: PropTypes.func.isRequired
}

export default Card;
