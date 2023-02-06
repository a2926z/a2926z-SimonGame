var level = 0;
userClickedPattern = [];
gamePattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
continueGame = true;
gameStarted = false;


$(document).on('keydown', function () {
  if (level === 0) {
    nextSequence();
    gameStarted = true;
    setTimeout(showHideInput, 500);
    
  }
})

function showHideInput () {
  $('.input').hide();
}

// document.querySelector('.start-btn').addEventListener('click', function(){ 
//   if (level === 0) {
//     nextSequence();
//     gameStarted = true;
//   }
// });

// $(".start-btn").click(function(){
//   if (level === 0) {
//     nextSequence();
//     gameStarted = true;
//   }
// });


function nextSequence() {
  level++;
  $('h1').html('Level ' + level);
  userClickedPattern = [];
  if (continueGame === true) {
    var randomNumber = Math.floor((Math.random() * 4));
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);

    loadFullGamePattern();
  }
}

var i = 0;


function loadFullGamePattern() {

  setTimeout(function () {
    playNextSequence(i);
    i++;
    // console.log(i)
    if (i < gamePattern.length) {
      loadFullGamePattern();
    }
    else {
      i = 0;
    }
  }, 500)
}

function playNextSequence(i) {

  let selectedButton = $('#' + gamePattern[i]);
  // console.log(randomChosenColour);
  selectedButton.fadeOut(100).fadeIn(100);
  // console.log(selectedButton.attr('id'));
  playSound(selectedButton.attr('id'));
}


$('.btn').click(function () {
  if (gameStarted === true && continueGame === true && userClickedPattern.length + 1 <= gamePattern.length) {
    console.log(userClickedPattern.length, gamePattern.length)
    userChosenColour = this.id;
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userChosenColour);
    // console.log(gamePattern, userClickedPattern);
    // setTimeout(nextSequence, 1000);
    checkAnswer(userClickedPattern.length - 1);
  }
})



//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // console.log("success", currentLevel);

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    // console.log("wrong");
    continueGame = false;
    var audioEnd = new Audio('sounds/wrong.mp3');
    audioEnd.play();
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over')
    }, 200)
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();

  }

}


function startOver() {
  level = 0;
  gamePattern = [];
  continueGame = true;
  gameStarted = false;
  $('.input').show();
}


function playSound(name) {
  audio = new Audio('sounds/' + name + '.mp3')
  audio.play();
}


function animatePress(currentColour) {
  $('.' + currentColour).addClass('pressed');
  setTimeout(function () {
    $('.' + currentColour).removeClass('pressed');
  }, 100)
}
