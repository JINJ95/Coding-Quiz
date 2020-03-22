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

// time
var minute = 60;

// Score
var score;

// Name
var nameSubmitted;


// Shuffled questions
var shuffledQuestions, currentQuestionIndex;

// Event Listener for elements
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
    location.reload();
});
viewHighscores.addEventListener('click', () => {
    introContainer.classList.add('d-none');
    showHighScores();
});

//when highscore is submitted
submitName.addEventListener('click', (event) => {
    event.preventDefault();
    nameSubmitted = userName.value.trim();
    showHighScores();
    
});


//list of questions
var questions = [
    {
        question: 'What is not a common data type?',
        answers: [
            {text: 'Integer', correct: false },
            {text: 'Boolean', correct: false },
            {text: 'String', correct: false },
            {text: 'Pig', correct: true }
        ]
    },
    {
        question: 'HTML is a programming language?',
        answers: [
            {text: 'False', correct: false },
            {text: 'True', correct: true },
        ]
    },
    {
        question: 'What element is used for the largest heading?',
        answers: [
            {text: '<h1>', correct: true },
            {text: '<h2>', correct: false },
            {text: '<h3>', correct: false },
            {text: '<h4>', correct: false }
        ]
    },
]

//set timer 

//keep track of correct and wrong answers

// Start game / Start timer / hide intro & start button / Display question and Answer buttons
function startGame() {
startTimer();
introContainer.classList.add('d-none');
questionContainer.classList.remove('d-none');
//shuffle questions
shuffledQuestions = questions.sort(() => Math.random() - .5);
currentQuestionIndex = 0;
setNextQuestion();
}

//reset form, questions, buttons
function resetState() {
    while (answerButtons.firstChild) {
        //nextButton.classList.add('hide');
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Set next question and answers
function setNextQuestion () { 
    resetState();
    
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// display question
function showQuestion (question) {
    if(question === undefined){
        allDone();
        return;
    } else 
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn','btn-primary','btn-lg', 'mx-3');
//check if answer is correct and set dataset to correct
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', answerSelected)
        answerButtons.appendChild(button);
    })
}

// when answer is selected add to score
function answerSelected (event) {
    var selectedButton = event.target.dataset.correct;

    if(selectedButton === undefined){
        minute = minute - 10;
    } else if (selectedButton === true){
        score++;
    }
    currentQuestionIndex++;
    setNextQuestion();
    //console.log(selectedButton);
}

//show high scores
function showHighScores () {
    allDoneContainer.classList.add("d-none");
    questionContainer.classList.add("d-none");
    highscoresContainer.classList.remove('d-none');
    navBar.classList.add('d-none');
}

//all Done
function allDone () {
    clearInterval(interval);
    allDoneContainer.classList.remove("d-none");
    questionContainer.classList.add("d-none");
}

function startTimer(){
    interval = setInterval(function() {
        minute--;
        renderTime();
    }, 1000);
}

function renderTime(){
    if (minute <= 0){
        clearInterval(interval);
        allDone();
    }
    time.innerHTML= minute;
}
