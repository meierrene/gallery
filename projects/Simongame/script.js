'use strict';

const buttonColours = ['green', 'red', 'yellow', 'blue'];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;

function nextSequence() {
  userClickedPattern.splice(0, userClickedPattern.length);
  level++;
  $('#level-title').text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  gamePattern.forEach((p, i) => {
    setTimeout(() => {
      playSound(p);
      $(`#${p}`).fadeOut();
      $(`#${p}`).fadeIn();
    }, 1000 * i);
  });
  console.log(gamePattern);
}

function playSound(name) {
  new Audio(`./sounds/${name}.mp3`).play();
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`.${currentColor}`).removeClass('pressed');
  }, 100);
}

function checkAnswer() {
  if (userClickedPattern.length === gamePattern.length)
    userClickedPattern.every((val, i) => val === gamePattern[i])
      ? correct()
      : wrong();
}

function correct() {
  setTimeout(() => {
    nextSequence();
  }, 1000);
}

function wrong() {
  $('#level-title').text(`Game Over, Press Any Key to Restart`);
  playSound('wrong');
  $('body').css('background-color', 'red');
  setTimeout(() => {
    $('body').css('background-color', '#011f3f');
  }, 500);
  init();
}

$('.btn').click(e => {
  const userChosenColour = e.target.closest('.btn').getAttribute('id');
  if (!userChosenColour) return;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

function init() {
  level = 0;
  $('body').one('keydown', () => {
    gamePattern.splice(0, gamePattern.length);
    nextSequence();
    $('body').css('background-color', '011f3f');
  });
}

document.querySelector('.aYear').innerHTML = new Date().getFullYear();

init();
