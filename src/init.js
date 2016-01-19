$(document).ready(function() {
  window.dancers = [];

  $(".addDancerButton").on("click", function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
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
    var randomColor = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
    dancer.$node.css({ 'height':randomRadius + 'px',
                        'width':randomRadius + 'px',
                        // 'background-color' : randomColor

                        //'background-size': 'cover'
                    });
    $('body').append(dancer.$node);
});
  var spreadOut = function(){
    dancers.forEach(function(dancer){
      dancer.moveTo($("body").height() * Math.random(),
    $("body").width() * Math.random());
    });
  };

  var lineUp = function() {
    var spacing = $("body").width() / dancers.length;
    for (var i = 0; i < dancers.length; i++) { 
      dancers[i].moveTo($('body').height()/2, spacing * i);
    }
  };

  $('.line-up').click(function() {
    lineUp();
  });
  $('.spread-out').click(function(){
    spreadOut();
  });
  var lastMoved = 0;
  $('body').on('mouseenter', '.dancer',function(e) {
    if (Date.now() - lastMoved > 500) {
      var dancer = dancers[+$(this).data('arrayIndex')];
      var func = dancer.constructor;
      var newDancer = new func(dancer.top, dancer.left, Math.random() * 1000, dancer.radius);
      
      // add to array
      dancers.push(newDancer);
      newDancer.$node.data('arrayIndex', dancers.length - 1);

      // set color
      var randomColor = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
      newDancer.$node.css({ 'height':dancer.radius + 'px',
                            'width': dancer.radius + 'px',
                            // 'background-color' : randomColor
                          });

      // add to screen
      $('body').append(newDancer.$node);

      // MOVE!
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var xDir = plusOrMinus * dancer.radius; 
      plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var yDir = plusOrMinus * dancer.radius; 
      newDancer.moveTo(dancer.top + xDir, dancer.left + yDir);
      dancer.moveTo(dancer.top - xDir, dancer.left - yDir);
      lastMoved = Date.now();
    }
  });

});
