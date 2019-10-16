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
        "1": { 
            name: "Aces", number: 1, score: null, region: "top" },
        "2": { 
            name: "Deuces", number: 2, score: null, region: "top" },
        "3": { 
            name: "Threes", number: 3, score: null, region: "top" },
        "4": { 
            name: "Fours", number: 4, score: null, region: "top" },
        "5": { 
            name: "Fives", number: 5, score: null, region: "top" },
        "6": { 
            name: "Sixes", number: 6, score: null, region: "top"
        },
        "totalTopRows": { score: null },
        "three_of_a_kind": { 
            name: "Three of a kind", combo: "three_of_a_kind", score: null, region: "bottom"
        },
        "four_of_a_kind": { 
            name: "Four of a kind", combo: "four_of_a_kind", score: null, region: "bottom"
        },
        "full_house": { 
            name: "Full House", combo: "full_house", score: null, region: "bottom"
        },
        "small_straight": { 
            name: "Small Straight", combo: "small_straight", score: null, region: "bottom"
        },
        "large_straight": { 
            name: "Large Straight", combo: "large_straight", score: null, region: "bottom"
        },
        "yahtzee": { 
            name: "Yahtzee", combo: "yahtzee", score: null, region: "bottom"
        },
        "chance": { 
            name: "Chance", combo: "chance", score: null, region: "bottom"
        },
        "totalBottomRows": { score: null },
        "totalGrand": { score: null },
    });

    const isRegionSlotsFull = (region) => {
        return (!Object.values(card).filter(slot => slot.region === region && slot.score === null).length);
    };

    const getRegionSlots = (region) => {
        return Object.values(card).filter(slot => slot.region === region);
    };

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

    const addUpSlots = (region) => {
        const slots = getRegionSlots(region);
        const add = (total,slot) => !isNaN(total.score) ? total.score+slot.score : total+slot.score;            
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

    const getScore = (slot) => {
        const dice = diceSet(props.diceOnTable);
        return isNaN(slot) ? combinations.determinePoints(slot, dice) : combinations.determinePoints("number", dice, slot);
    }

    const topSlots = Object.values(getRegionSlots("top"));
    const bottomSlots = Object.values(getRegionSlots("bottom"));

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

export default Card;
