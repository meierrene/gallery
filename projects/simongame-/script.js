'use strict';

const buttonColours = ['green', 'red', 'yellow', 'blue'];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;

const nextSequence = () => {
  userClickedPattern.splice(0, userClickedPattern.length);
  level++;
  $('.level-title').text(`Level ${level}`);
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
};

const playSound = name => {
  new Audio(`./sounds/${name}.mp3`).play();
};

const animatePress = currentColor => {
  $(`.${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`.${currentColor}`).removeClass('pressed');
  }, 100);
};

const checkAnswer = () => {
  if (userClickedPattern.length === gamePattern.length)
    userClickedPattern.every((val, i) => val === gamePattern[i])
      ? correct()
      : wrong();
};

const correct = () => {
  setTimeout(() => {
    nextSequence();
  }, 1000);
};

const wrong = () => {
  $('.level-title').text(`Game Over, Your score was ${level}`);
  playSound('wrong');
  $('html').css('background-color', 'red');
  setTimeout(() => {
    $('html').css('background-color', '#011f3f');
  }, 500);
  init();
  $('.start-btn').toggle('hidden');
  $('.start-btn').text('Play again');
};

$('.btn').click(e => {
  const userChosenColour = e.target.closest('.btn').getAttribute('id');
  if (!userChosenColour) return;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

const init = () => {
  level = 0;
  $('.start-btn').one('click', () => {
    gamePattern.splice(0, gamePattern.length);
    nextSequence();
    $('body').css('background-color', '011f3f');
    $('.start-btn').toggle('hidden');
  });
};

$('.aYear').text(new Date().getFullYear());

init();
