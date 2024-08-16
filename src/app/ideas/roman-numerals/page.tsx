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