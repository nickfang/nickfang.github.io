'use client';

import React, { useState, ChangeEvent } from 'react';

function getRomanNumeral(number: number): string {
  // convert the number to a roman numeral
  const hundreds = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
  const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

  let temp: number = number;
  let output: string = '';

  const m = Math.floor(temp / 1000)
  output = Array(m).fill('M').join('');
  temp = temp % 1000;

  const c = Math.floor(temp / 100);
  output = output + hundreds[c];
  temp = temp % 100;

  const x = Math.floor(temp / 10);
  output = output + tens[x];
  temp = temp % 10;

  output = output + ones[temp]

  return output;
}

export function solution(number: number): string {
  const num_to_string = `${number}`.split('')
  const ones = ['I','X','C','M']
  const fives = ['V','L','D']
  const transform = (n: number, index: number): string => {
    if (!n) return ''
    else if (n === 9) return ones[index] + ones[index + 1]
    else if (n === 4) return ones[index] + fives[index]
    else if (n >= 5 && n % 5 <= 3) return fives[index] + transform(n % 5, index)
    else return ones[index].repeat(n)
  }
  return num_to_string.reduce((roman, current, index, arr) => {
    return roman + transform(parseInt(current), arr.length - index - 1)
  }, "")
}

// TODO:  need to do some input validation, can get in an infinite loop
const RomanNumerals = () => {
  const [number, setNumber] = useState<number>(0);
  const [romanNumeral, setRomanNumeral] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(parseInt(value));
  }

  const handleClick = () => {
    setRomanNumeral(getRomanNumeral(number));
  }

  return (
    <div>
      <h1>Roman Numerals</h1>
      <div>
        <input type="number" value={number} onChange={handleChange} />
        <button onClick={handleClick}>Convert</button>
      </div>
      <div>
        {romanNumeral}
      </div>
    </div>
  );
}

export default RomanNumerals;