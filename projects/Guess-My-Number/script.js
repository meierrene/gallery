'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //when there's no input number
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';

    // when player wins
  } else if (guess === secretNumber) {
    document.querySelector('h1').textContent = "That's right!";
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score >= highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    //when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('h1').textContent = 'Game Over';
      document.querySelector('.number').textContent = '☠';
      document.querySelector('.message').textContent =
        '💥 You lost the game!\nThe number was: ' + secretNumber;
      document.querySelector('body').style.backgroundColor = 'red';
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('h1').textContent = 'Guess My Number!';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
});

document.addEventListener('keydown', function (e) {
  // When Pressed Esc AND if this white window is still opened.
  // if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  if (e.key === 'Enter') {
    document.querySelector('.check').click();
  }
});
