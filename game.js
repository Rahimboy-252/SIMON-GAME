let buttonColors = ['red', 'green', 'yellow', 'blue']
let randomChoosenColor
let selectedColor
let gamePattern = []
let userClickedPattern = []
let level = 0

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)
    randomChoosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChoosenColor)
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChoosenColor)
    level++
    $('h1').text("Level: " + level)
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
    }
})

$(".btn").click(function (e) {
    selectedColor = e.target.id
    userClickedPattern.push(selectedColor)
    playSound(selectedColor)
    animatePress(selectedColor)
    checkAnswer(userClickedPattern.length - 1)
})
function checkAnswer(level){
    if (userClickedPattern[level] == gamePattern[level]){
        console.log(userClickedPattern)
        console.log(gamePattern)
        if(userClickedPattern.length == gamePattern.length){
            console.log("succes")
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }else{
            console.log(fail)
        }
    }
}
