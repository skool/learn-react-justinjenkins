import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardRow from './CardRow';
import { cardDefinition } from './cardDefinition';
import { Table } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import * as combinations from '../../rules/combinations';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import './Card.css';

const Card = props => {

    // should we use useReducer instead ?
    const [card, setCard] = useState(cardDefinition);

    // this might better if I move the CardDef into state?
    useEffect(() => {
        if (isRegionSlotsFull("top")) {
            const slotsTotal = addUpSlots("top");

            setSlot("totalTopRows", slotsTotal, true);

            if (slotsTotal > 62) {
                setSlot("totalTopRowsPlusBonus", slotsTotal+35, true);
            } else {
                setSlot("totalTopRowsPlusBonus", slotsTotal, true);
            }
        }
        if (isRegionSlotsFull("bottom")) {
            setSlot("totalBottomRows", addUpSlots("bottom"), true);
        }
        if (card.totalTopRowsPlusBonus.score && card.totalBottomRows.score) {
            setSlot("totalGrand", card.totalTopRowsPlusBonus.score+card.totalBottomRows.score, true);
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

    const setSlot = (slot, score, force) => {
        if (card[slot].score === null && (!props.locked || force)) {

            score = (score ? score : getScore(slot));
            const newScore = { score: score };

            setCard((prevState) => {
                return { ...prevState, [slot]: Object.assign(prevState[slot], newScore) };
            });

            props.resetDice();
            props.lockCard(true);
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
                <th>Upper Section</th>
                <th style={{width: '150px'}}>How to Score</th>
                <th style={{width: '50px', textAlign: 'center'}}>Game #1</th>
                <th style={{width: '50px', textAlign: 'center', opacity: '.25'}}>Game #2</th>
                <th style={{width: '50px', textAlign: 'center', opacity: '.25'}}>Game #3</th>        
                </tr>
            </thead>
            <tbody>
            {topSlots.map(slot => {
                return <CardRow key={slot.name} name={slot.name} number={slot.number} score={card[slot.number].score} setSlot={setSlot} />
            })}
            <tr>
                <th style={{width: '200px', textTransform: 'uppercase'}}>Total Score</th>
                <td> <FontAwesomeIcon icon={faLongArrowAltRight} size="2x" /></td>
                <td className="slot score sub">{card.totalTopRows.score}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th style={{width: '200px', textTransform: 'uppercase'}}>Bonus</th>
                <td>[Score 35] If total score is 63 or over</td>
                <td className="slot score bonus">{card.totalTopRows.score > 62 ? 35 : ""}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th style={{width: '200px', textTransform: 'uppercase'}}>Total of Upper Section</th>
                <td> <FontAwesomeIcon icon={faLongArrowAltRight} size="2x" /></td>
                <td className="slot score sub">{card.totalTopRowsPlusBonus.score}</td>
                <td></td>
                <td></td>
            </tr>
            {bottomSlots.map(slot => {
                return <CardRow key={slot.name} name={slot.name} combo={slot.combo} score={card[slot.combo].score} setSlot={setSlot} />
            })}
            <tr>
                <th style={{width: '200px', textTransform: 'uppercase'}}>Lower Total Score</th>
                <td> <FontAwesomeIcon icon={faLongArrowAltRight} size="2x" /></td>
                <td className="slot score sub">{card.totalBottomRows.score}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th style={{width: '200px'}}>Grand Total</th>
                <td> <FontAwesomeIcon icon={faLongArrowAltRight} size="2x" /></td>
                <td className="slot score grand">{card.totalGrand.score}</td>
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
    resetDice: PropTypes.func.isRequired,
    lockCard: PropTypes.func.isRequired,
    locked: PropTypes.bool.isRequired
}

export default Card;
