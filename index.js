ButtonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
UserChoosenPattern = [];
var Start = 0;
function nextSequence() {
  var randnum = getRandomInt(0, ButtonColors.length - 1);
  return ButtonColors[randnum];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateNext() {
  randomChosenColour = nextSequence();
  Start++;
  $("h1").text("Level " + Start);
  UserChoosenPattern = [];
  calc();
}
$(document).keypress(function () {
  if (gamePattern.length == 0) {
    generateNext();
  }
});
function calc() {
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomChosenColour);
}
$(".btn").on("click", function () {
  const UserChoosenColor = $(this).attr("id");
  makeSound(UserChoosenColor);
  UserChoosenPattern.push(UserChoosenColor);
  animatePress(UserChoosenColor);
  checkAnser(UserChoosenPattern.length - 1);
});

function makeSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnser(currentLevel) {
  if (UserChoosenPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (UserChoosenPattern.length === gamePattern.length) {
      setTimeout(generateNext, 1000);
    }
  } else {
    var wrongaudio = new Audio("sounds/wrong.mp3");
    wrongaudio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setInterval(function () {
      $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
    Start = 0;
  }
}
