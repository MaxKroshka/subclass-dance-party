describe("blinkyDancer", function() {

  var blinkyDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that makes its node blink", function() {
    sinon.spy(blinkyDancer.$node, 'velocity');
    blinkyDancer.step();
    expect(blinkyDancer.$node.velocity.called).to.be.true;
  });

  describe("dance", function() {
    it("should call step at least once per second", function() {
      sinon.spy(blinkyDancer, "step");
      expect(blinkyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(blinkyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(blinkyDancer.step.callCount).to.be.equal(2);
    });
  });
});

describe("bouncyDancer", function() {

  var bouncyDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    bouncyDancer = new BouncyDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function() {
    expect(bouncyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that makes its node blink", function() {
    sinon.spy(bouncyDancer.$node, 'velocity');
    bouncyDancer.step();
    expect(bouncyDancer.$node.velocity.called).to.be.true;
  });

  describe("dance", function() {
    it("should call step at least once per second", function() {
      sinon.spy(bouncyDancer, "step");
      expect(bouncyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(bouncyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(bouncyDancer.step.callCount).to.be.equal(2);
    });
  });
});


describe("pulsingDancer", function() {

  var pulsingDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    pulsingDancer = new PulsingDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function() {
    expect(pulsingDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that makes its node blink", function() {
    sinon.spy(pulsingDancer.$node, 'velocity');
    pulsingDancer.step();
    expect(pulsingDancer.$node.velocity.called).to.be.true;
  });

  describe("dance", function() {
    it("should call step at least once per second", function() {
      sinon.spy(pulsingDancer, "step");
      expect(pulsingDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(pulsingDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(pulsingDancer.step.callCount).to.be.equal(2);
    });
  });
});
