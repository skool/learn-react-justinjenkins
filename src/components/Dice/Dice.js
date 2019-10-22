import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne,faDiceTwo,faDiceThree,faDiceFour,faDiceFive, faDiceSix, faIcicles } from '@fortawesome/free-solid-svg-icons'

import './Dice.css';

const Dice = ({ frozen, handleFreezeDice, style, id, number, size, spin }) => {

    const dice = [
        <FontAwesomeIcon icon={faDiceOne} className={frozen ? "dice frozen" : "dice"} size={size} spin={spin ? true : false} />,
        <FontAwesomeIcon icon={faDiceTwo} className={frozen ? "dice frozen" : "dice"} size={size} spin={spin ? true : false} />,
        <FontAwesomeIcon icon={faDiceThree} className={frozen ? "dice frozen" : "dice"} size={size} spin={spin ? true : false} />,
        <FontAwesomeIcon icon={faDiceFour} className={frozen ? "dice frozen" : "dice"} size={size} spin={spin ? true : false} />,
        <FontAwesomeIcon icon={faDiceFive} className={frozen ? "dice frozen" : "dice"} size={size} spin={spin ? true : false} />,
        <FontAwesomeIcon icon={faDiceSix} className={frozen ? "dice frozen" : "dice"} size={size} spin={spin ? true : false} />,
    ]

    const getDice = (number) => {
        return dice[number-1];
    }

    const onDiceClick = useCallback(() => {
        handleFreezeDice(id)
    }, [handleFreezeDice, id]);

    return (
        <span id={id} className="fa-layers fa-fw" style={style} onClick={onDiceClick}>
            {getDice(number, frozen)}
            {frozen ? <FontAwesomeIcon icon={faIcicles} className="icicle" transform="shrink-3 up-0.5" /> : ""}
        </span>
    );

}

Dice.defaultProps = {
    spin: false
};

Dice.propTypes = {
    frozen: PropTypes.bool,
    handleFreezeDice: PropTypes.func,
    number: PropTypes.number.isRequired,
    size: PropTypes.string,
    spin: PropTypes.bool,
};

export default Dice;