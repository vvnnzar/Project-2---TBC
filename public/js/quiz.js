// Key used for storing high scores in local storage
let STORAGE_HIGH_SCORE_KEY = "highScores";

// Declaring
const startButton = document.getElementById("start-btn");
const gameInfoElement = document.getElementById("info");
const questionContainerElement = document.getElementById("container");
const submitInitialsElement = document.getElementById("submit-initials");
const highScoresSectionElement = document.getElementById("highscores");
// const initialsScoreElement = document.querySelector("#initials-score");
const userScoreForm = document.querySelector("#user-score-form");

//  A variable declared in global scope is available to all functions
let gameTimer;
let remainingTimeSeconds;
let shuffledQuestions, currentQuestionIndex;

// Update time remaining in game. change is subtracted from current time remaining.
function updateTimeRemaining(change) {
    let timeRemainingElement = document.querySelector(".timer-count");

    remainingTimeSeconds -= change;
    timeRemainingElement.textContent = remainingTimeSeconds;

    // if timerCount gets to 0, it will clear the timer and call function 'loseGame'
    if (remainingTimeSeconds <= 0) {
        stopGame(false);
    }
}

// Declaring function Start Game, will execute when called.
function startGame() {
    // When function is called, it will print Start
    console.log("Start");
    // Adding hide class to below variables
    startButton.classList.add("hide");
    gameInfoElement.classList.add("hide");

    shuffledQuestions = quiz.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    remainingTimeSeconds = 75;
    updateTimeRemaining(0);

    showQuestion(shuffledQuestions[currentQuestionIndex]);

    // Start the game timer.
    gameTimer = setInterval(function () {
        updateTimeRemaining(1);
    }, 1000);
}

function stopGame(won) {
    questionContainerElement.classList.add("hide");
    clearInterval(gameTimer);

    if (won) {
        showSubmitInitials();
    } else {
        showHighScores();
    }
}


function renderHighScores(highScoreList) {
    let highScoreListElement = document.querySelector("#highscores-list");

    //  clears list and updates
    highScoreListElement.innerHTML = "";

    // render a new li for each userScore
    for (let i = 0; i < highScoreList.length; i++) {
        let highScore = highScoreList[i];
        let li = document.createElement("li");
        li.textContent = highScore.initials + " - " + highScore.score;
        li.setAttribute("data-index", i);
        highScoreListElement.appendChild(li);
    }
}

function showQuestion(multiChoiceQuestion) {

    questionContainerElement.classList.remove("hide");

    // Hide answers.
    let answerSectionElement = document.getElementById("answer-section");
    while (answerSectionElement.firstChild) {
        //  removes the firstChild from list
        answerSectionElement.removeChild(answerSectionElement.firstChild);
    }

    let questionElement = document.getElementById("question");
    questionElement.innerText = multiChoiceQuestion.question;

    //  calls function for each array element
    multiChoiceQuestion.choices.forEach(choice => {
        // creates a button element
        let button = document.createElement("button");
        button.innerText = choice;
        // Depending on which answer the user chooses, if they choose correctly, it will call correct answer. Else it will call wrong answer.
        if (choice === multiChoiceQuestion.answer) {
            // Attaches event handler to the document
            button.addEventListener("click", correctAnswer);
        } else {
            // adding click event
            button.addEventListener("click", wrongAnswer);

        }
        //  appends the button to answerSectionElement
        answerSectionElement.appendChild(button);
    });

}

function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex === shuffledQuestions.length) {
        console.log("stopGame");
        stopGame(true);
        return;
    }

    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function correctAnswer() {
    // logs correct
    console.log("correct");
    //  calls function
    let correctElement = document.getElementById("correct");
    correctElement.classList.remove("hide");
    setTimeout(function () {
        correctElement.classList.add("hide");
    }, 500);
    showNextQuestion();

}

function wrongAnswer() {
    console.log("wrong");
    updateTimeRemaining(10);

    let wrongElement = document.getElementById("wrong");
    wrongElement.classList.remove("hide");
    setTimeout(function () {
        wrongElement.classList.add("hide");
    }, 500);
    showNextQuestion();
}

function showSubmitInitials() {
    submitInitialsElement.classList.remove("hide");

    let newScoreElement = document.querySelector("#new-score");
    newScoreElement.textContent = "Your final score is " + remainingTimeSeconds + ".";

    userScoreForm.addEventListener("submit", function (event) {
        event.preventDefault();
        //  add submit to form
        let initialsInput = document.querySelector("#initials");
        let userScoreText = initialsInput.value.trim().toUpperCase();
        //  return from function early if left blank
        if (userScoreText === "") {
            return;
        }
        addNewHighScore({
            initials: userScoreText,
            score: remainingTimeSeconds
        });
        initialsInput.value = "";
        showHighScores();
    });
}

function loadHighScores() {
    let highScores = JSON.parse(localStorage.getItem(STORAGE_HIGH_SCORE_KEY));
    if (highScores == null) {
        highScores = [];
    }
    return highScores;
}

function addNewHighScore(newScore) {
    let highScores = loadHighScores();
    // adding newScore into scores array
    highScores.push(newScore);
    // sort list from high to low scores
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    // will take off any score that is after ten
    highScores.splice(10);
    localStorage.setItem(STORAGE_HIGH_SCORE_KEY, JSON.stringify(highScores));
    return highScores;
}

function showHighScores() {
    gameInfoElement.classList.add("hide");
    startButton.classList.add("hide");
    questionContainerElement.classList.add("hide");
    submitInitialsElement.classList.add("hide");
    highScoresSectionElement.classList.remove("hide");

    let clearButton = document.getElementById("clear-btn");
    clearButton.addEventListener('click', function () {
        localStorage.clear();
        renderHighScores(loadHighScores());
    });

    //  get stored userScores form local storage
    let highScores = loadHighScores();

    // this is a helper function that will render the list to the DOM
    renderHighScores(highScores);
}

//  global scope
const quiz = [
    {
        "question": "Commonly used data types DO NOT include:",
        "choices": ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        "answer": "3. Alerts"
    }, {
        "question": "The condition is an if / else statement is enclosed within _____.",
        "choices": ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        "answer": "3. parenthesis"
    }, {
        "question": "Arrays in JavaScript can be used to store _____.",
        "choices": ["1. number and strings", "2. other arrays", "3. booleans", "4. all the above"],
        "answer": "4. all the above"
    }, {
        "question": "String values must be enclosed withing _____ when being assigned to variables.",
        "choices": ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        "answer": "3. quotes"
    }, {
        "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
        "choices": ["1. JavaScript", "2. Terminal / Bash", "3. for loops", "4. console.log"],
        "answer": "4. console.log"
    }
]

startButton.addEventListener('click', startGame);