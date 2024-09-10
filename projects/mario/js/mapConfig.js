import { bump, enemy, patrol } from './gameScript.js';
import { mario, goomba, goombaCave } from './sprites.js';
import { maps } from './maps.js';

export const levelCfg = {
  width: 20,
  height: 20,
  '=': () => [sprite('brick'), area(), solid(), 'brick'],
  c: () => [sprite('cobblestone'), area(), solid(), 'brick'],
  '%': () => [sprite('surprise'), area(), solid(), 'mushroom-surprise'],
  '*': () => [sprite('surprise'), area(), solid(), 'coin-surprise'],
  $: () => [
    sprite('coin'),
    area(),
    bump(64, 8),
    // cleanup(),
    // lifespan(0.4, { fade: 0.01 }),
    'coin',
  ],
  '}': () => [sprite('unboxed'), bump(), area(), solid()],
  '-': () => [
    sprite('pipe'),
    area(),
    pos(-20, -20),
    solid(),
    scale(0.5),
    'pipe',
  ],

  p: () => [
    sprite('mario'),
    area(),
    solid(),
    body(),
    origin('bot'),
    mario(),
    bump(100, 7, true),
    'player',
  ],
  '^': () => [
    sprite('enemies'),
    goomba(),
    area(),
    solid(),
    body(),
    enemy(),
    patrol(100),
    scale(1.1),
    z(1),
    'dangerous',
  ],
  '@': () => [
    sprite('enemies'),
    goombaCave(),
    area(),
    solid(),
    body(),
    enemy(),
    patrol(100),
    scale(1.1),
    z(1),
    'dangerous',
  ],
  '#': () => [
    sprite('mushroom'),
    'mushroom',
    body(),
    patrol(1000, 60, 1, 'brick'),
    area(),
  ],
  '!': () => [sprite('brick-cave'), area(), solid(), 'brick', scale(0.5)],
  v: () => [sprite('block-cave'), area(), solid(), scale(0.5)],
  H: () => [
    sprite('castle'),
    pos(20, 20),
    area(),
    origin('botright'),
    z(-1),
    'castle',
  ],
  j: () => [
    sprite('shrubbery'),
    pos(0, 20),
    scale(2),
    origin('bot'),
    pos(0, -1),
    z(-1),
  ],
  k: () => [sprite('hill'), pos(0, 20), scale(2), origin('bot'), z(-2)],
  l: () => [sprite('cloud'), scale(2), z(-2)],
};

const coinsOnLevel = selMap => {
  const query = selMap.join('').trim().split('');
  let amountCoins = 0;
  query.forEach(q => {
    q === '*' ? amountCoins++ : '';
    q === '$' ? amountCoins++ : '';
  });
  return amountCoins;
};

export const totalAmount = coinsOnLevel(maps);
