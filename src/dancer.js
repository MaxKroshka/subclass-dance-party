"use strict";
class Dancer {
  constructor(top, left, timeBetweenSteps, radius){
    this.timeBetweenSteps = timeBetweenSteps;
    this.top = top;
    this.left = left;
    this.radius = radius; 
    var images = ['alien.gif', 'squid.gif','cat.gif', 'astronaut.gif'];
    this.$node = $('<div class="dancer"><img src="'+ images[Math.floor(Math.random() * images.length)] +'"></div>');
    this.step(); 
    this.setPosition(top, left);
  }
  step () {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }
  setPosition (top, left) {
    var styleSettings = {
      top: top,
      left: left
    };
    this.$node.css(styleSettings);
  }

  bounceOffWalls () {
    var duration = 100;
    var distance = 10;
    if (this.top < 0) {
      this.moveTo(distance, this.left, duration);
    }
    else if (this.top + this.radius > $(window).height()) {
      this.moveTo($(window).height() - this.radius - distance, this.left, duration);
    }
    else if (this.left < 0) {
      this.moveTo(this.top, distance, duration);
    }
    else if (this.left + this.radius > $(window).width()) {
      this.moveTo(this.top, $(window).width() - this.radius - distance, duration);
    }
  }

  collision (dancer2) {
    return (this.left < dancer2.left + dancer2.radius &&
    this.left + this.radius > dancer2.left &&
    this.top < dancer2.top + dancer2.radius &&
    this.radius + this.top > dancer2.top);
  }

  findCollisions (){
    if (!window.detectCollisions) {
      return;
    }
    this.bounceOffWalls();
    for(var i = 0; i < window.dancers.length; i++){
      if(this !== window.dancers[i] && this.collision(window.dancers[i])){
        this.$node.velocity({rotateZ: "+=360deg"}, {'queue': false});
        window.dancers[i].$node.velocity({rotateZ: "+=360deg"}, {'queue': false});
        this.moveAwayFrom(window.dancers[i]);
      }
    }
  }

  moveAwayFrom (otherDancer) {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var xDir = plusOrMinus * this.radius; 
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var yDir = plusOrMinus * this.radius; 
    otherDancer.moveTo(this.top + xDir, this.left + yDir);
    this.moveTo(this.top - xDir, this.left - yDir);
  }

  moveTo (top, left, duration){
    duration = duration || this.timeBetweenSteps;
    this.top = top;
    this.left = left;
    this.$node.velocity({'top': top+"px", 'left': left+"px"}, {'queue': false, 'duration': duration, complete: this.findCollisions.bind(this)});
  }

}
//
// CHILD CLASSES
// 
class BlinkyDancer extends Dancer {
  constructor(top, left, timeBetweenSteps, radius) {
    super(top, left, timeBetweenSteps, radius);
  }

  step() { 
    Dancer.prototype.step.call(this);
    this.$node.velocity("callout.flash");
  }
}

class BouncyDancer extends Dancer{
  constructor(top, left, timeBetweenSteps, radius){
    super(top, left, timeBetweenSteps, radius);
  }

  step() {
  Dancer.prototype.step.call(this);
  this.$node.velocity("callout.bounce");
  }
}

class PulsingDancer extends Dancer{
  constructor(top, left, timeBetweenSteps, radius) {
    super();
  }
  step () {
  Dancer.prototype.step.call(this);
  this.$node.velocity("callout.pulse");
  }
}

