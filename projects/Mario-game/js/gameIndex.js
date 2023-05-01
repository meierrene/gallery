// import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs'; //CDN v3.0
import kaboom from '../kaboom/dist/kaboom.mjs';
import { levelCfg } from './mapConfig.js';
import { maps } from './maps.js';
import * as controlProperties from './controlProperties.js';

//=========================================================================
// Global Variables and loadSound
//=========================================================================

let SPEED = controlProperties.WALK_SPEED;
export let isBig = false;
let isJumping = false;
let isInvincible = false;
let level = 0;
let score = 0;
let levelMusic;

kaboom({
  canvas: controlProperties.canvas,
  scale: 2,
  debug: true,
  background: [0, 0, 0, 1],
  fullscreen: true,
});

debug.inspect = false;

loadRoot('./src/audios/');
loadSound('jump0', 'jump0.wav');
loadSound('jump1', 'jump1.wav');
loadSound('death', 'death.wav');
loadSound('pause', 'pause.wav');
loadSound('bump', 'bump.wav');
loadSound('pipe', 'pipe.wav');
loadSound('coin', 'coin.wav');
loadSound('test', 'test.mp3');
loadSound('power_down', 'power_down.wav');
loadSound('grow-up', 'grow-up.wav');
loadSound('breakblock', 'breakblock.wav');
loadSound('stomp', 'stomp.wav');
loadSound('stage_clear', 'stage_clear.wav');
loadSound('mushroom_appears', 'mushroom_appears.wav');

loadRoot('./src/img/');
loadAseprite('mario', 'Mario.png', 'Mario.json');
loadAseprite('enemies', 'Enemies.png', 'Enemies.json');
loadSprite('bg1', 'bg1.png');
loadSprite('cloud', 'cloud.png');
loadSprite('hill', 'hill.png');
loadSprite('shrubbery', 'shrubbery.png');
loadSprite('coin', 'coin.png');
loadSprite('brick', 'brick.png');
loadSprite('cobblestone', 'cobblestone.png');
loadSprite('brick-cave', 'brick-cave.png');
loadSprite('block-cave', 'block-cave.png');
loadSprite('mushroom', 'mushroom.png');
loadSprite('surprise', 'surprise-block.png');
loadSprite('surprise-cave', 'surprise-block-cave.png');
loadSprite('unboxed', 'unboxed.png');
loadSprite('pipe', 'pipe.png');
loadSprite('castle', 'castle.png');

const stopMusic = music => {
  music.pause();
  music.currentTime = 0;
};

//=========================================================================
// Scene configuration
//=========================================================================

scene('game', (level, score) => {
  const updateScore = (coins = 0, level) => {
    controlProperties.coinValue.textContent = `: ${coins}`;
    controlProperties.levelValue.textContent = `Level: ${level + 1}`;
  };

  updateScore(score, level);

  controlProperties.resetContainer.classList.add('hidden');

  layers(['bg', 'obj', 'ui'], 'obj');

  if (level === 0 || level === 4 || level === 5)
    add([sprite('bg1'), layer('bg'), pos((0, 0)), scale(2)]);

  levelMusic.play();

  const gameLevel = addLevel(maps[level], levelCfg);
  const scoreLabel = add([{ value: score }]);
  const player = gameLevel.spawn('p', 1, 10);

  const playerState = () => {
    isBig ? player.bigger() : player.smaller();
  };
  playerState();

  const invincibility = () => {
    isInvincible = true;
    setInterval(
      () => (isInvincible = false),
      controlProperties.INVINCIBILITY_TIME_INTERVAL
    );
  };

  const toLose = () => {
    if (isBig) {
      controlProperties.secretBtn.checked ? play('test') : play('power_down');
      player.smaller();
      isBig = false;
      invincibility();
    } else if (isInvincible) return;
    else {
      stopMusic(levelMusic);
      controlProperties.secretBtn.checked ? play('test') : play('death');
      go('lose', { score: scoreLabel.value });
    }
  };

  //=========================================================================
  // Collision detection logic
  //=========================================================================

  player.onHeadbutt(obj => {
    if (obj.is('coin-surprise')) {
      let coin = gameLevel.spawn('$', obj.gridPos.sub(0, 1));
      coin.bump();

      destroy(obj);
      gameLevel.spawn('}', obj.gridPos.sub(0, 0));
    }
    if (obj.is('mushroom-surprise' || 'mushroom-surprise-cave')) {
      play('mushroom_appears');
      gameLevel.spawn('#', obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn('}', obj.gridPos.sub(0, 0));
    }
    if (isBig) {
      if (obj.is('brick')) {
        play('breakblock');
        destroy(obj);
      }
    } else play('bump');
  });

  player.onCollide('mushroom', m => {
    play('grow-up');
    destroy(m);
    if (!isBig) player.bigger();
    isBig = true;
  });

  player.onCollide('coin', c => {
    play('coin');
    destroy(c);
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
    updateScore(scoreLabel.text, level);
  });

  player.onCollide('dangerous', d => {
    if (isJumping || !player.isGrounded()) {
      player.bump();
      play('stomp');
      destroy(d);
    } else toLose();
  });

  player.onCollide('pipe', () => {
    onKeyPress(controlProperties.GO_DOWN_KEY, () => {
      stopMusic(levelMusic);
      play('pipe');
      nextLevel(level + 1, scoreLabel.value);
    });
  });

  player.onCollide('castle', () => {
    stopMusic(levelMusic);
    play('stage_clear');
    go('win', { score: scoreLabel.value });
  });

  //=========================================================================
  // Player script & frames
  //=========================================================================

  player.onUpdate(() => {
    const currCam = camPos();
    if (currCam.x < player.pos.x) camPos(player.pos.x, currCam.y);
    if (player.pos.y >= controlProperties.FALL_DEATH) {
      isBig = false;
      toLose();
    }
    if (player.isFrozen) {
      player.standing();
    }
    if (!player.isGrounded()) {
      player.jumping();
      isJumping = true;
    } else {
      isJumping = false;
      if (
        isKeyDown(controlProperties.GO_LEFT_KEY) ||
        isKeyDown(controlProperties.GO_RIGHT_KEY)
      ) {
        player.running();
      } else if (isKeyDown(controlProperties.GO_DOWN_KEY)) {
        player.ducking();
      } else {
        player.standing();
      }
    }
  });

  //=========================================================================
  // Key Commands behaaviour
  //=========================================================================

  onKeyDown(controlProperties.GO_LEFT_KEY, () => {
    if (player.isFrozen) return;
    player.flipX(true);
    if (toScreen(player.pos).x > 20) player.move(-SPEED, 0);
  });

  onKeyDown(controlProperties.GO_RIGHT_KEY, () => {
    if (player.isFrozen) return;
    player.flipX(false);
    player.move(SPEED, 0);
  });

  onKeyPress(controlProperties.JUMP_KEY, () => {
    if (player.isGrounded()) {
      play(`jump${randi(0, 2)}`, { volume: 0.5 });
      isBig
        ? player.jump(controlProperties.BIG_JUMP_FORCE)
        : player.jump(controlProperties.JUMP_FORCE);
    }
  });

  onKeyDown(controlProperties.RUN_KEY, () => {
    SPEED = controlProperties.RUN_SPEED;
  });

  onKeyRelease(controlProperties.RUN_KEY, () => {
    SPEED = controlProperties.WALK_SPEED;
  });
});

//=========================================================================
// lose
//=========================================================================

scene('lose', ({ score }) => {
  isBig = false;
  controlProperties.resetBtn.textContent = 'TRY AGAIN!';
  controlProperties.resetContainer.classList.remove('hidden');
  controlProperties.resetText.textContent = `
    Game over!
    Your score was: ${score} coin${score === 1 ? '' : 's'}.
    `;
});

//=========================================================================
// Win
//=========================================================================

scene('win', ({ score }) => {
  const gameCompleted = ((score / controlProperties.TOTAL_COINS) * 100).toFixed(
    0
  );
  isBig = false;
  controlProperties.resetBtn.textContent = 'RESTART GAME';
  controlProperties.resetContainer.classList.remove('hidden');
  controlProperties.resetText.textContent = `
    Congratulations
    You won this game!
    Your score: ${score} coin${score === 1 ? '' : 's'}.
    ${
      score === controlProperties.TOTAL_COINS
        ? `🏆AMAZING!!!🏆
    You got all coins! ${gameCompleted}%! 😁👍`
        : `You collected ${gameCompleted}% of coins.`
    }`;
});

//=========================================================================
// Pause
//=========================================================================

const toggleInfo = () => {
  play('pause');
  controlProperties.helpContainer.classList.toggle('hidden');
  controlProperties.overlay.classList.toggle('hidden');
};

controlProperties.resetBtn.addEventListener('click', function () {
  init();
});

//=========================================================================
// Init
//=========================================================================

const init = () => {
  controlProperties.helpIcon.addEventListener('click', toggleInfo);
  controlProperties.closeModal.addEventListener('click', toggleInfo);
  controlProperties.overlay.addEventListener('click', toggleInfo);
  controlProperties.resetText.textContent = 'Click on screen to start play!';
  controlProperties.resetContainer.style.transform = 'translateX(-50%)';
  controlProperties.resetBtn.classList.add('hidden');
  document.querySelector('body').addEventListener(
    'click',
    () => {
      if (window.screen.width > 600) nextLevel();
    },
    { once: true }
  );
};

const nextLevel = (levelGame = 0, scoreGame = 0) => {
  controlProperties.loadingScreen.classList.remove('hidden');
  controlProperties.loadingContent.textContent = `
  Level: ${levelGame + 1}
  `;
  setTimeout(() => {
    controlProperties.loadingScreen.classList.add('hidden');
    if (controlProperties.resetBtn.classList.contains('hidden'))
      controlProperties.resetBtn.classList.remove('hidden');

    if (levelMusic) stopMusic(levelMusic);

    levelMusic = new Audio(
      levelGame === 0 || levelGame === 4 || levelGame === 5
        ? './src/audios/levelGround.mp3'
        : './src/audios/levelCave.mp3'
    );
    levelMusic.loop = true;
    go('game', levelGame, scoreGame);
  }, 1500);
};

document.querySelector(
  '.version'
).innerHTML = `Version ${controlProperties.gameVersion}`;
document.querySelector('.aYear').innerHTML = new Date().getFullYear();

init();
