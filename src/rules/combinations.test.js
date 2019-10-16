import {addAllDice, addNumberedDice, determinePoints} from './combinations.js';

it('🎲  add all dice', () => {
  const addToSix = addAllDice([1,1,1,1,2]);
  expect(addToSix).toBe(6);
});

it('🎲  add matching dice', () => {
  const addToFour = addNumberedDice([1,1,1,1,2], 1);
  expect(addToFour).toBe(4);
});

it('🎲  three of a kind', () => {
  const three_of_a_kind = determinePoints("three_of_a_kind", [1,1,1,2,3]);
  expect(three_of_a_kind).toBe(8);
});

it('🎲  NOT three of a kind', () => {
  const three_of_a_kind = determinePoints("three_of_a_kind", [1,1,2,2,3]);
  expect(three_of_a_kind).toBe(0);
});

it('🎲  four of a kind', () => {
  const four_of_a_kind = determinePoints("four_of_a_kind", [1,1,1,1,3]);
  expect(four_of_a_kind).toBe(7);
});

it('🎲  full house', () => {
  const full_house = determinePoints("full_house", [1,1,1,2,2]);
  expect(full_house).toBe(25);
});

it('🎲  NOT full house', () => {
  const full_house = determinePoints("full_house", [1,1,1,4,5]);
  expect(full_house).toBe(0);
});

it('🎲  small', () => {
  const small_straight = determinePoints("small_straight", [1,1,2,3,4]);
  expect(small_straight).toBe(30);
});

it('🎲  NOT small', () => {
  const small_straight = determinePoints("small_straight", [1,2,4,4,6]);
  expect(small_straight).toBe(0);
});

it('🎲  large', () => {
  const large_straight = determinePoints("large_straight", [1,2,3,4,5]);
  expect(large_straight).toBe(40);
});

it('🎲  NOT large', () => {
  const large_straight = determinePoints("large_straight", [1,2,3,5,5]);
  expect(large_straight).toBe(0);
});

it('🎲  chance', () => {
  const chance = determinePoints("chance", [1,2,4,5,6]);
  expect(chance).toBe(18);
});

it('🎲  yahtzee', () => {
  const yahtzee = determinePoints("yahtzee", [1,1,1,1,1]);
  expect(yahtzee).toBe(50);
});

it('🎲  number 4x2', () => {
  const number = determinePoints("number", [1,2,4,4,6], 4);
  expect(number).toBe(8);
});

it('🎲  number 4x0', () => {
  const number = determinePoints("number", [1,2,2,5,6], 0);
  expect(number).toBe(0);
});