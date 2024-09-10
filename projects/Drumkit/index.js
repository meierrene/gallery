'use strict';

const btn = document.querySelectorAll('.drum');

function handler(i) {
  const innerBtn = document.querySelector(`.k${i + 1}`);
  innerBtn.classList.add('pressed');
  new Audio(`./sounds/tom${i + 1}.mp3`).play();
  setTimeout(() => {
    innerBtn.classList.remove('pressed');
  }, 200);
}

btn.forEach((b, i) => {
  b.addEventListener('click', e => {
    e.preventDefault;
    handler(i);
  });
});

window.addEventListener('keydown', e => {
  e.key === 'w' ? handler(0) : '';
  e.key === 'a' ? handler(1) : '';
  e.key === 's' ? handler(2) : '';
  e.key === 'd' ? handler(3) : '';
  e.key === 'j' ? handler(4) : '';
  e.key === 'k' ? handler(5) : '';
  e.key === 'l' ? handler(6) : '';
});

document.querySelector('.aYear').innerHTML = new Date().getFullYear();
