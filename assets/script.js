var landingPage = document.getElementById("landingPage");
var quizSection = document.getElementById("quizSection");
var endingSection = document.getElementById("endingSection");
var highScoreSection = document.getElementById("highScoreScreen");

var startButton = document.getElementById("startButton");
var highScores = document.getElementById("highScores");
var timerElement = document.getElementById("timer");
var questionElement = document.getElementById("question");
var answerOne = document.getElementById("answerOne");
var answerTwo = document.getElementById("answerTwo");
var answerThree = document.getElementById("answerThree");
var answerFour = document.getElementById("answerFour");
var finalScore = document.getElementById("finalScore");
var subForm = document.getElementById("submit");
var initalForm = document.getElementById("initials");
var scoreList = document.getElementById("scoreList");

//Variables for the timer
var timerCount;
var timer;

//Variables for displaying quiz questions
var currentQuestion;

//varibles for the high score screen
var userScore;
var userInitials;
var highScore;
var savedScores;

//Quiz questions 
var quizQuestions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["string", "boolean", "alerts", "number"],
        correct: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with",
        answers: ["quotes", "curly brakets", "parenthesis", "square brakets"],
        correct: "parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables",
        answers: ["commas", "curly brakets", "quotes", "parenthesis"],
        correct: "quotes"
    },
    {
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log"
    }
]

function startQuiz() {
    landingPage.style.display = "none";
    quizSection.style.display = "flex";
    timerCount = 75;
    currentQuestion = 0;
    beginTimer();
    displayQuiz();
}

function beginTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Timer: " + timerCount;
        if (timerCount === 0) {
          // Clears interval
          clearInterval(timer);
        }
      }, 1000);
}

function displayQuiz(){
    if(currentQuestion < quizQuestions.length){
        questionElement.textContent = quizQuestions[currentQuestion].question;
        answerOne.textContent = quizQuestions[currentQuestion].answers[0];
        answerTwo.textContent = quizQuestions[currentQuestion].answers[1];
        answerThree.textContent = quizQuestions[currentQuestion].answers[2];
        answerFour.textContent = quizQuestions[currentQuestion].answers[3];

        answerOne.addEventListener("click", checkAnswer);
        answerTwo.addEventListener("click", checkAnswer);
        answerThree.addEventListener("click", checkAnswer);
        answerFour.addEventListener("click", checkAnswer);
    } else {
        endQuiz();
    }
}

function checkAnswer(event){
    var correctAnswer = quizQuestions[currentQuestion].correct;
    var userAnswer = event.currentTarget.textContent;

    if (correctAnswer === userAnswer){
        console.log("Correct");
    } else {
        console.log("Incorrect");
        timerCount -= 5;
    }

    currentQuestion++;

    displayQuiz();
}

function endQuiz(){
    userScore = timerCount;
    clearInterval(timer);
    timerCount = 0;
    timerElement.textContent = "Timer: " + timerCount;
    finalScore.textContent = "Your final score is: " + userScore;

    quizSection.style.display = "none";
    endingSection.style.display = "flex";

    subForm.addEventListener("submit", addHighScore);
}

function addHighScore(event){
    event.preventDefault();
    userInitials = initalForm.value;

    if(localStorage.hasOwnProperty("highScore")){
        highScore = JSON.parse(localStorage.getItem("highScore"));
        highScore.push({
            initals: userInitials,
            score: userScore
        });
    } else {
        highScore = [{
            initals: userInitials,
            score: userScore
        }];
    }

    localStorage.setItem("highScore", JSON.stringify(highScore));
    displayHighScores();
}

function displayHighScores(){
    savedScores = JSON.parse(localStorage.getItem("highScore"));

    for(var i=0; i<savedScores.length; i++){
        var newScore = document.createElement("li");
        newScore.textContent = savedScores[i].initals + " " + savedScores[i].score;
        scoreList.appendChild(newScore);
    }

    landingPage.style.display = "none";
    quizSection.style.display = "none";
    endingSection.style.display = "none";
    highScoreSection.style.display = "flex";
}

startButton.addEventListener("click", startQuiz);
highScores.addEventListener("click", displayHighScores);