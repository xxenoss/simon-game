var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

// Start Game.
$(document).keypress(gameStart);

$(".start").click(gameStart)


function gameStart(){
    if(!started){
        $(".level-title").text("You are at Level "+ level);
        nextSequence();
        started = true;
    }
}


$(".buttons").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickPattern.length-1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickPattern[currentLevel]){
        if( userClickPattern.length ===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("level-title").text("Game Over Press Any key to Restart.");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
    
    

}
function nextSequence(){
    userClickPattern = [];
    level++;
    $(".level-title").text("You are at Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
// Press Animation
function animatePress (currentcolor){
    $("#"+ currentcolor).addClass("pressed")
    setTimeout(function(){
        $("#"+ currentcolor).removeClass("pressed");
    }, 100);
}

//play Sound
function playSound(name){
    var audio = new Audio("sounds/"+name+ ".mp3")
    audio.play()
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}