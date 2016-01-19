// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps, radius) {

  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.radius = radius;
  // use jQuery to create an HTML <span> tag
  this.$node = $('<div class="dancer"></div>');

  this.step(); 
  this.setPosition(top, left);
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
};

Dancer.prototype.step = function() {
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  };
  
Dancer.prototype.setPosition = function(top, left) {
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    var styleSettings = {
      top: top,
      left: left
    };
    this.$node.css(styleSettings);
  };

Dancer.prototype.moveTo = function(top, left, duration){
  duration = duration || this.timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.$node.velocity({
    'top': top+"px",
    'left': left+"px"
}, {
      'queue': false,
      'duration': duration
    });
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
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  this.$node.velocity("callout.bounce");
};

var PulsingDancer = function(top, left, timeBetweenSteps, radius) {
  Dancer.call(this, top, left, timeBetweenSteps, radius);
};

PulsingDancer.prototype = Object.create(Dancer.prototype);
PulsingDancer.prototype.constructor = PulsingDancer;
PulsingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  this.$node.velocity("callout.pulse");
};
