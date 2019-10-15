import React, { useState, useEffect } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
//import { Button } from 'react-bulma-components';
import { Table } from 'react-bulma-components';
import CardRow from './CardRow';
import * as combinations from '../../rules/combinations';

import './Card.css';

const Card = props => {

    // useReducer ?
    const [card, setCard] = useState({
        "1": { score: null, region: "top" },
        "2": { score: null, region: "top" },
        "3": { score: null, region: "top" },
        "4": { score: null, region: "top" },
        "5": { score: null, region: "top" },
        "6": { score: null, region: "top" },
        "totalTopRows": { score: null },
        "three_of_a_kind": { score: null, region: "bottom" },
        "four_of_a_kind": { score: null, region: "bottom" },
        "full_house": { score: null, region: "bottom" },
        "small_straight": { score: null, region: "bottom" },
        "large_straight": { score: null, region: "bottom" },
        "yahtzee": { score: null, region: "bottom" },
        "chance": { score: null, region: "bottom" },
        "totalBottomRows": { score: null },
    });

    const isRegionSlotsFull = (region) => {
        return (!Object.values(card).filter(slot => slot.region === region && slot.score === null).length);
    };

    const getRegionSlots = (region) => {
        return Object.values(card).filter(slot => slot.region === region && slot.score);
    };

    useEffect(() => {
        if (isRegionSlotsFull("top")) {
            setSlot("totalTopRows", addUpSlots("top"));
        }
        if (isRegionSlotsFull("bottom")) {
            setSlot("totalBottomRows", addUpSlots("bottom"));
        }
    });

    const addUpSlots = (region) => {
        const slots = getRegionSlots(region);
        const add = (total,slot) => total.score ? total.score+slot.score : total+slot.score;            
        const total = slots.reduce(add);
        return total;
    };

    const diceSet = (diceOnTable) => {
        return Object.values(diceOnTable).map(dice => dice.number).sort();
    };

    // rename section to `slot` ?
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

    const getScore = (section) => {
        const dice = diceSet(props.diceOnTable);
        // only supports number right now
        return combinations.determinePoints("number", dice, section);
    }

    return (
    <div id="card">
        <h2>My Card</h2>

        <Table className="is-bordered">
            <thead>
                <tr>
                <th style={{textTransform:'uppercase', width: '100px'}}>Upper Section</th>
                <th style={{textTransform:'uppercase', width: '100px'}}>How to Score</th>
                <th style={{textTransform:'uppercase', width: '50px', textAlign: 'center'}}>Game #1</th>
                <th style={{textTransform:'uppercase', width: '50px', textAlign: 'center'}}>Game #2</th>
                <th style={{textTransform:'uppercase', width: '50px', textAlign: 'center'}}>Game #3</th>        
                </tr>
            </thead>
            <tbody>
            <CardRow name="Aces" number={1} score={card[1].score} setSlot={setSlot} />
            <CardRow name="Deuces" number={2} score={card[2].score} setSlot={setSlot} />
            <CardRow name="Threes" number={3} score={card[3].score} setSlot={setSlot} />
            <CardRow name="Fours" number={4} score={card[4].score} setSlot={setSlot} />
            <CardRow name="Fives" number={5} score={card[5].score} setSlot={setSlot} />
            <CardRow name="Sixes" number={6} score={card[6].score} setSlot={setSlot} />
            <tr>
                <th style={{textTransform:'uppercase', width: '200px'}}>Total Score</th>
                <td> -></td>
                <td style={{fontWeight:'bold', textAlign: 'center'}}>{card.totalTopRows.score}</td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </Table>

    </div>
    );

}

export default Card;
