export const mario = () => {
  return {
    smallAnimation: 'Running',
    bigAnimation: 'RunningBig',
    smallStopFrame: 0,
    bigStopFrame: 8,
    smallJumpFrame: 5,
    bigJumpFrame: 13,
    bigDuckFrame: 14,
    update() {},
    bigger() {
      this.isBig = true;
      this.area.width = 24;
      this.area.height = 32;
    },
    smaller() {
      this.isBig = false;
      this.area.width = 16;
      this.area.height = 16;
    },
    standing() {
      this.stop();
      this.unfreeze();
      this.frame = this.isBig ? this.bigStopFrame : this.smallStopFrame;
    },
    jumping() {
      this.stop();
      this.frame = this.isBig ? this.bigJumpFrame : this.smallJumpFrame;
    },
    running() {
      const animation = this.isBig ? this.bigAnimation : this.smallAnimation;
      if (this.curAnim() !== animation) {
        this.play(animation);
      }
    },
    freeze() {
      this.isFrozen = true;
    },
    unfreeze() {
      this.isFrozen = false;
    },
    die() {
      this.unuse('body');
      this.bump();
      this.isAlive = false;
      this.freeze();
      this.use(lifespan(1, { fade: 1 }));
    },
    ducking() {
      this.stop();
      this.freeze();
      this.frame = this.isBig ? this.bigDuckFrame : this.smallStopFrame;
    },
  };
};

export const goomba = () => {
  return {
    animation: 'Walking',
    update() {
      if (this.curAnim() !== this.animation) {
        this.play(this.animation);
      }
    },
  };
};

export const goombaCave = () => {
  return {
    animation: 'WalkingCave',
    update() {
      if (this.curAnim() !== this.animation) {
        this.play(this.animation);
      }
    },
  };
};
