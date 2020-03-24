// creating variables for elements
var startButton = document.getElementById("startButton");
var introContainer = document.getElementById('introContainer');
var questionContainer = document.getElementById('questionContainer');
var questionElement = document.getElementById('question');
var answerButtons = document.getElementById('answerButtons');
var nextButton = document.getElementById('nextButton');
var highscoresContainer = document.getElementById('highscores');
var restartButton = document.getElementById('restartButton');
var time = document.getElementById('time');
var viewHighscores = document.getElementById('viewHighscores');
var allDoneContainer = document.getElementById('allDoneContainer');
var userName = document.getElementById('userName');
var submitName = document.getElementById('submitName');
var navBar = document.getElementById('navBar');
var scoreList = document.getElementById('scoreList');
var questionsCorrect = document.getElementById('correct');
var questionsIncorrect = document.getElementById('incorrect');
var correctDisplay = document.getElementById('correctDisplay');
var incorrectDisplay = document.getElementById('incorrectDisplay');
var timeDisplay = document.getElementById('timeDisplay');
var clearButton = document.getElementById('clearButton');

// time
var minute = 60;

// Score
var score = 0;
var incorrect = 0;

// highscores
var highscores = [];

// Shuffled questions
var shuffledQuestions, currentQuestionIndex;

// Event Listener for elements
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
    location.reload();
});
viewHighscores.addEventListener('click', () => {
    introContainer.classList.add('d-none');
    init();
    renderHighscores();
    showHighScores();
});
clearButton.addEventListener('click', function () {
    localStorage.clear();
    init();
    renderHighscores();
});


//when highscore is submitted
submitName.addEventListener('click', (event) => {
    event.preventDefault();
    var nameSubmitted = userName.value.trim();
    highscores.push(nameSubmitted + " ----- " + "Correct: " + score + " ----- " + "Incorrect: " + incorrect + " ----- " +"Seconds Left: " + minute);
    storeHighscores();
    renderHighscores();
    showHighScores();
});

function renderHighscores() {
    // Clear scoreList 
    scoreList.innerHTML = "";

    //if highscores is empty 
    if (highscores === null) {
        scoreList.innerHTML = "Play to set a Highscore!"
        return;
    }

    // Render a new li for each highscore
    for (var i = 0; i < highscores.length; i++) {
        var scores = highscores[i];

        var li = document.createElement("li");
        li.textContent = highscores
        scoreList.appendChild(li);
    }
}

// Stringify and set highscores key in localStorage
function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

// get stored scores from local storage
function init() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

// if highscores were retrieved from local Storage, update the highscores array to it
    if (highscores !== null) {
        highscores = storedHighscores;
    }
// render todos to the DOM
    renderHighscores();
}

//list of questions
var questions = [
    {
        question: 'What is not a common data type?',
        answers: [
            { text: 'Integer', correct: false },
            { text: 'Boolean', correct: false },
            { text: 'String', correct: false },
            { text: 'Pig', correct: true }
        ]
    },
    {
        question: 'HTML is a programming language?',
        answers: [
            { text: 'False', correct: false },
            { text: 'True', correct: true },
        ]
    },
    {
        question: 'What element is used for the largest heading?',
        answers: [
            { text: '<h1>', correct: true },
            { text: '<h2>', correct: false },
            { text: '<h3>', correct: false },
            { text: '<h4>', correct: false }
        ]
    },
    {
        question: 'What element is required to begin HTML?',
        answers: [
            { text: '<html lang="en"></html>', correct: true },
            { text: '<head></head>', correct: false },
            { text: '<body></body>', correct: false },
            { text: '<div></div>', correct: false }
        ]
    },
    {
        question: 'What element is used to style within HTML?',
        answers: [
            { text: '<html lang="en"></html>', correct: false },
            { text: '<head></head>', correct: false },
            { text: '<body></body>', correct: false },
            { text: '<style></style>', correct: true }
        ]
    },
    {
        question: 'Within what element do you write JavaScript?',
        answers: [
            { text: '<script></script>', correct: true },
            { text: '<head></head>', correct: false },
            { text: '<body></body>', correct: false },
            { text: '<style></style>', correct: false }
        ]
    },
    {
        question: 'What variable contains an Object',
        answers: [
            { text: 'var object = {}', correct: true },
            { text: 'var object = []', correct: false },
            { text: 'var object = object', correct: false },
            { text: 'var object = true', correct: false }
        ]
    },
    {
        question: 'What variable contains a Boolean',
        answers: [
            { text: 'var object = {}', correct: false },
            { text: 'var object = []', correct: false },
            { text: 'var object = true', correct: true },
            { text: 'var object = false', correct: false }
        ]
    },
    {
        question: 'What variable contains an Array',
        answers: [
            { text: 'var object = {}', correct: false },
            { text: 'var object = []', correct: true },
            { text: 'var object = object', correct: false },
            { text: 'var object = true', correct: false }
        ]
    },
    {
        question: 'What variable contains a String',
        answers: [
            { text: 'var object = {}', correct: false },
            { text: 'var object = []', correct: false },
            { text: 'var object = "object"', correct: true },
            { text: 'var object = true', correct: false }
        ]
    },
    
]


// Start game / Start timer / hide intro & start button / Display question and Answer buttons
function startGame() {
    startTimer();
    introContainer.classList.add('d-none');
    questionContainer.classList.remove('d-none');
    //shuffle questions
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
    correctDisplay.classList.remove('d-none');
    incorrectDisplay.classList.remove('d-none');
    timeDisplay.classList.remove('d-none');
}

//reset form, questions, buttons
function resetState() {
    while (answerButtons.firstChild) {
        //nextButton.classList.add('hide');
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Set next question and answers
function setNextQuestion() {
    resetState();
    
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// display question
function showQuestion(question) {
    if (question === undefined) {
        allDone();
        return;
    } else
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-primary', 'btn-lg', 'mx-3');
        //check if answer is correct and set dataset to correct
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', answerSelected)
        answerButtons.appendChild(button);
    })
}

// when answer is selected
function answerSelected(event) {
    //keep track of correct and wrong answers
    var selectedButton = event.target.dataset.correct;
    if (selectedButton === undefined) {
        incorrect++;
        questionsIncorrect.innerHTML = incorrect;
        minute = minute - 10;
    } else {
        score++;
        questionsCorrect.innerText = score;
    }
    currentQuestionIndex++;
    setNextQuestion();
    //console.log(selectedButton);
}

//show high scores
function showHighScores() {
    storeHighscores();
    init();
    renderHighscores();
    allDoneContainer.classList.add("d-none");
    questionContainer.classList.add("d-none");
    highscoresContainer.classList.remove('d-none');
    navBar.classList.add('d-none');
}

//all Done
function allDone() {
    clearInterval(interval);
    allDoneContainer.classList.remove("d-none");
    questionContainer.classList.add("d-none");
}

//set timer 
function startTimer() {
    interval = setInterval(function () {
        minute--;
        renderTime();
    }, 1000);
}

function renderTime() {
    if (minute <= 0) {
        clearInterval(interval);
        allDone();
    }
    time.innerHTML = minute;
}
