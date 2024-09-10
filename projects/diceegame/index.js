'use strict';

const h1 = document.querySelector('h1');
const dices = document.querySelectorAll('.img');
const btn = document.querySelector('.btn');

const diceNumber = function () {
  return Math.ceil(Math.random() * 6);
};

btn.addEventListener('click', () => {
  const players = [diceNumber(), diceNumber()];

  dices.forEach((d, i) => {
    d.setAttribute('src', `./img/dice${players[i]}.png`);
  });

  players[0] === players[1]
    ? (h1.textContent = 'Draw!')
    : players[0] > players[1]
    ? (h1.textContent = '🚩 Player 1 wins!')
    : (h1.textContent = 'Player 2 wins! 🚩');
});

document.querySelector('.aYear').innerHTML = new Date().getFullYear();
