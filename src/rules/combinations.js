// @todo should we add in the chance to get another roll

export const addAllDice = dice => { const add = (a,b) => a+b; return dice.reduce(add); };

export const addNumberedDice = (dice, number) => {
    const matchingDice = dice.filter( di => di === number);
    return matchingDice.length ? addAllDice(matchingDice) : 0;
};

export const combos = {
    "number": { 
        "points": (dice, number) => addNumberedDice(dice, number), 
        "min": 0, "match": true, "assending": false
    },
    "three_of_a_kind": { 
        "points": dice => addAllDice(dice), 
        "min": 3, "match": true, "assending": false,
        "howto": "Add Total of All Dice"
    },
    "four_of_a_kind": { 
        "points": dice => addAllDice(dice), 
        "min": 4, "match": true, "assending": false,
        "howto": "Add Total of All Dice"
    },
    "full_house": { 
        "points": dice => 25, 
        "min": 2, "match": true, "assending": false,
        "howto": "[Score 25] Double & 3 of a kind"
    },
    "small_straight": { 
        "points": dice => 30, 
        "min": 4, "match": false, "assending": true,
        "howto": "[Score 30] Sequence of 4"
    },
    "large_straight": { 
        "points": dice => 40, 
        "min": 5, "match": false, "assending": true,
        "howto": "[Score 40] Sequence of 5" 
    },
    "yahtzee": { 
        "points": dice => 50, 
        "min": 5, "match": true, "assending": false,
        "howto": "[Score 50] 5 of a Kind" 
    },
    "chance": { 
        "points": dice => addAllDice(dice), 
        "min": 0, "match": false, "assending": false,
        "howto": "Add Total of All Dice"
    },
};

export const determinePoints = (type, dice, number) => {

    dice.sort();

    let points = 0;

    if (
        (type === "full_house" && fullHouse(dice)) ||
        (type === "small_straight" && straight(dice, combos.small_straight.min)) ||
        (type === "large_straight" && straight(dice, combos.large_straight.min)) ||
        (type === "three_of_a_kind" && ofAKind(dice,combos.three_of_a_kind.min)) ||
        (type === "four_of_a_kind" && ofAKind(dice, combos.four_of_a_kind.min)) ||
        (type === "yahtzee" && yahtzee(dice)) ||
        (type === "chance") || 
        (type === "number" && number)
    ){
        return number ? combos[type].points(dice, number) : combos[type].points(dice);
    }

    return points;

};

const getMatches = (dice, min) => {

    dice.sort();

    const diceGrouped = groupDice(dice);

    const matches = diceGrouped.filter((d) => {
        if (d.count>1) { return true; }
        return false;
    });

   return matches;

}

const getUniques = (dice) => {

    dice.sort();

    const diceGrouped = groupDice(dice);

    const uniques = diceGrouped.filter((d) => {
        if (d.count>1) { return false; }
        return true;
    });

   return uniques;

}

const groupDice = (dice) => {

    dice.sort();

    const diceGrouped = [
        {id: 1, "count": 0},
        {id: 2, "count": 0},
        {id: 3, "count": 0},
        {id: 4, "count": 0},
        {id: 5, "count": 0},
        {id: 6, "count": 0},
    ];

    dice.forEach(d => {
        diceGrouped[d-1].count += 1;
    });

    return diceGrouped;

}

const ofAKind = (dice, min) => {

    const matches = getMatches(dice);

    if (matches.length && min === 1) {
        return false;
    }

    if (matches && matches.filter(d => d.count >= min).length) {
        return true;
    }

    return false;
}

const yahtzee = (dice) => {

    if (ofAKind(dice,5)) { return true; }

    return false;
}

const fullHouse = (dice) => {

    if (!ofAKind(dice,4) && ofAKind(dice,3) && getMatches(dice).length === 2) { return true; }

    return false;
}

const isConsecutive = numbers => {
    numbers.sort();

    const isOneLarger = (n,i,a) => {
        return i === 0 || n === a[i-1]+1;
    };

    return !numbers.map(isOneLarger).some(el => el === false);
}

const straight = (dice, number) => {
    
    if (number === 5 && !ofAKind(dice,2)) { return true; }
    if (number === 4 && !ofAKind(dice,3) && getMatches(dice).length <= 1) { 
        const uniqueDice = getUniques(dice).map(dice => dice.id);
        return isConsecutive(uniqueDice);
    }

    return false;
}
