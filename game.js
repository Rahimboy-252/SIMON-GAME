let buttonColors = ['red', 'green', 'yellow', 'blue']
let randomChoosenColor
let selectedColor
let gamePattern = []
let userClickedPattern = []
let level = 0
let gameIsRunning = false
let highScore = 0

function nextSequence() {
    if (gameIsRunning) {
        let randomNumber = Math.floor(Math.random() * 4)
        randomChoosenColor = buttonColors[randomNumber]
        gamePattern.push(randomChoosenColor)
        $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChoosenColor)
        level++
        $('h1').text("Level: " + level)
        userClickedPattern = []
    }
}

function playSound(color) {
    let sound = new Audio('./sounds/' + color + '.mp3')
    sound.play()
}

function animatePress(color) {
    $('#' + color).addClass("pressed")

    setTimeout(function () {
        $("#" + color).removeClass("pressed")
    }, 100)
}

$('body').keypress(function () {
    if (level == 0) {
        nextSequence()
        gameIsRunning = true
    }
})

$(".btn").click(function (e) {
    if (gameIsRunning) {
        selectedColor = e.target.id
        userClickedPattern.push(selectedColor)
        playSound(selectedColor)
        animatePress(selectedColor)
        checkAnswer(userClickedPattern.length - 1)
    }

})
function checkAnswer(level) {
    if (userClickedPattern[level] == gamePattern[level]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        gameOver()
    }

}

function gameOver() {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 500)
    $("h1").text("Game over, please press any key to restart")
    checkHighest(level)
    $("#high-score").text("Highest score: " + highScore)
    level = 0
    userClickedPattern = []
    gamePattern = []
    gameIsRunning = false
}

function checkHighest(score) {
    if (highScore < score) {
        highScore = score
    }
}
