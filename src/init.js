$(document).ready(function() {
  window.dancers = [];
  window.detectCollisions = true;
  $(".addDancerButton").on("click", function(event) {

    window.detectCollisions = true;
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var randomRadius = Math.floor(Math.random() * 100 +50);
    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000,
      randomRadius
    );

    dancers.push(dancer);
    dancer.$node.data('arrayIndex', dancers.length - 1);
    dancer.$node.css({ 'height':randomRadius + 'px', 'width':randomRadius + 'px'});
    $('body').append(dancer.$node);
});
  var spreadOut = function(){
    dancers.forEach(function(dancer){
      dancer.moveTo($("body").height() * Math.random(),
    $("body").width() * Math.random());
    });
  };

  var lineUp = function() {
    $('.dancer').velocity('stop');
    var spacing = $("body").width() / dancers.length;
    for (var i = 0; i < dancers.length; i++) { 
      dancers[i].moveTo($('body').height()/2 - dancers[i].radius/2, spacing * i);
    }
  };

  $('.line-up').click(function() {
    window.detectCollisions = false;
    lineUp();
  });
  $('.spread-out').click(function(){
    window.detectCollisions = true;
    spreadOut();
  });
  


  var backgrounds = ['bg.jpg', 'bikini.png','deep-space.jpg', 'sea.jpg'];
  var currentBg = 0;
  
  var addBubbles = function () {
    var numBubbles = Math.floor(Math.random() * 15 + 5);
    while (numBubbles > 0) {
      setTimeout(function() {
        var xPosition = Math.floor(Math.random() * $('body').width());
        $('.bg').append('<span class="bubble" style="left: '+ xPosition + 'px; "></span>');
      }, Math.floor(Math.random() * 6000));
      numBubbles--;
    }
  };

  $('.bg-change').click(function() {
    currentBg = (currentBg + 1) % backgrounds.length;
    $('.bg')
    .css( 'background', 'url(./img/' + backgrounds[currentBg] + ')' )
    .velocity('transition.flipBounceXIn');
    if (currentBg % 2 === 1 ) {
      addBubbles();
    } else {

      // clear all timeouts
      var id = window.setTimeout(function() {}, 0);
      while (id--) {
          window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
      
      $('.bubble').remove();
    }
  });


  var lastMoved = 0;
  $('body').on('mouseenter', '.dancer',function(e) {
    if (Date.now() - lastMoved > 500) {
      window.detectCollisions = true;
      var dancer = dancers[+$(this).data('arrayIndex')];
      var func = dancer.constructor;
      var newDancer = new func(dancer.top, dancer.left, Math.random() * 1000, dancer.radius);
      
      // add to array
      dancers.push(newDancer);
      newDancer.$node.data('arrayIndex', dancers.length - 1);
      newDancer.$node.css({ 'height':dancer.radius + 'px', 'width': dancer.radius + 'px'});

      // add to screen
      $('body').append(newDancer.$node);
      dancer.moveAwayFrom(newDancer);
      lastMoved = Date.now();
    }
  });


});
