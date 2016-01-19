// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps, radius) {

  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.radius = radius;
  // use jQuery to create an HTML <span> tag
  var images = ['alien.gif', 'jupiter.gif', 'astronaut.gif'];
  this.$node = $('<div class="dancer"><img src="'+ images[Math.floor(Math.random() * images.length)] +'"></div>');

  this.step(); 
  this.setPosition(top, left);
};

Dancer.prototype.step = function() {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  };
  
Dancer.prototype.setPosition = function(top, left) {
    var styleSettings = {
      top: top,
      left: left
    };
    this.$node.css(styleSettings);
  };

  var collision = function(dancer1, dancer2) {
    return (dancer1.left < dancer2.left + dancer2.radius &&
    dancer1.left + dancer1.radius > dancer2.left &&
    dancer1.top < dancer2.top + dancer2.radius &&
    dancer1.radius + dancer1.top > dancer2.top);
    // collision detected!
  };

Dancer.prototype.findCollisions = function(){
  if (!window.detectCollisions) {
    return;
  }
  for(var i = 0; i < window.dancers.length; i++){
    if(this !== window.dancers[i] && collision(this, window.dancers[i])){
      this.$node.velocity({rotateZ: "+=360deg"}, {'queue': false});
      window.dancers[i].$node.velocity({rotateZ: "+=360deg"}, {'queue': false});
      this.moveAwayFrom(window.dancers[i]);
    }
  }
};

Dancer.prototype.moveAwayFrom = function(otherDancer) {
      // MOVE!
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var xDir = plusOrMinus * this.radius; 
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var yDir = plusOrMinus * this.radius; 
      otherDancer.moveTo(this.top + xDir, this.left + yDir);
      this.moveTo(this.top - xDir, this.left - yDir);
};


Dancer.prototype.moveTo = function(top, left, duration){
  duration = duration || this.timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.$node.velocity({'top': top+"px", 'left': left+"px"}, {'queue': false, 'duration': duration, complete: this.findCollisions.bind(this)});
};

//
// CHILD CLASSES
// 
var BlinkyDancer = function(top, left, timeBetweenSteps, radius) {
  Dancer.call(this, top, left, timeBetweenSteps, radius);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;
BlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  this.$node.velocity("callout.flash");
};

var BouncyDancer = function(top, left, timeBetweenSteps, radius) {
  Dancer.call(this, top, left, timeBetweenSteps, radius);
};

BouncyDancer.prototype = Object.create(Dancer.prototype);
BouncyDancer.prototype.constructor = BouncyDancer;
BouncyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.velocity("callout.bounce");
};

var PulsingDancer = function(top, left, timeBetweenSteps, radius) {
  Dancer.call(this, top, left, timeBetweenSteps, radius);
};

PulsingDancer.prototype = Object.create(Dancer.prototype);
PulsingDancer.prototype.constructor = PulsingDancer;
PulsingDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.velocity("callout.pulse");
};

