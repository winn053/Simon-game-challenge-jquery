var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function startGame() {
  nextSequence();
  gameStarted = true;
  $('#level-title').text('Level ' + level);
  console.log('game started');
}

$(document).on('keydown', function () {
  if (!gameStarted) {
    startGame();
  }
});

$('.btn').on('click', function () {
  if (!gameStarted) {
    startGame();
    return;
  }
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound('./sounds/' + userChosenColor + '.mp3');
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); // pass in current index
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound('./sounds/' + randomChosenColor + '.mp3');

  level++;
  $('#level-title').text('Level ' + level);
}

function playSound(name) {
  var snd = new Audio(name); // buffers automatically when created
  snd.play();
}

function animatePress(currentColor) {
  $('.' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('.' + currentColor).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
    if (currentLevel === level - 1) {
      console.log('sequence finished');
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log('wrong');
    playSound('./sounds/wrong.mp3');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text(
      'Game Over, Press Any Key or Colored Button to Restart'
    );
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}
