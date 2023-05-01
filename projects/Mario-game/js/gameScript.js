export const enemy = () => {
  return {
    id: 'enemy',
    require: ['pos', 'area', 'sprite', 'patrol'],
    isAlive: true,
    squash() {
      this.isAlive = false;
      this.unuse('patrol');
      this.stop();
      this.frame = 2;
      this.area.width = 16;
      this.area.height = 8;
      this.use(lifespan(0.5, { fade: 0.1 }));
    },
  };
};

export const bump = (offset = 8, speed = 2, stopAtOrigin = true) => {
  return {
    id: 'bump',
    require: ['pos'],
    bumpOffset: offset,
    speed: speed,
    bumped: false,
    origPos: 0,
    direction: -1,
    update() {
      if (this.bumped) {
        this.pos.y = this.pos.y + this.direction * this.speed;
        if (this.pos.y < this.origPos - this.bumpOffset) {
          this.direction = 1;
        }
        if (stopAtOrigin && this.pos.y >= this.origPos) {
          this.bumped = false;
          this.pos.y = this.origPos;
          this.direction = -1;
        }
      }
    },
    bump() {
      this.bumped = true;
      this.origPos = this.pos.y;
    },
  };
};

export const patrol = (distance = 100, speed = 50, dir = 1, obj) => {
  return {
    id: 'patrol',
    require: ['pos', 'area'],
    startingPos: vec2(0, 0),
    add() {
      this.startingPos = this.pos;
      this.onCollide((obj, side) => {
        if (side === 'left' || side === 'right') {
          dir = -dir;
        }
      });
    },
    update() {
      if (Math.abs(this.pos.x - this.startingPos.x) >= distance) {
        dir = -dir;
      }
      this.move(speed * dir, 0);
    },
  };
};

export const swing = () => {
  return {};
};
