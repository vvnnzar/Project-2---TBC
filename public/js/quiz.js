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
    shuffledQuestions = frontendQuiz.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    remainingTimeSeconds = 100;
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


let frontendQuiz = [
    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "1. JavaScript",
            "2. Terminal / Bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: [
            "1. The < /head > section",
            "2. Both the < head > section and the < body > section are correct",
            "3. The < footer > section",
            "4. The < body > section",
        ],
        answer: "2. Both the < head > section and the < body > section are correct",
    },

    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: [
            "1. < script name='xxx.js' >",
            "2. < script scr= 'xxx.js' >",
            "3. < script href='xxx.js' >",
            "4. None of the above",
        ],
        answer: "2. < script scr= 'xxx.js' >",
    },

    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: [
            "1. msgBox('Hello World');",
            "2. msg('Hello World'):",
            "3. alert('Hello World');",
            "4. alertBox('Hello World');",
        ],
        answer: "3. alert('Hello World');",
    },

    {
        question: "How do you create a function in JavaScript?",
        choices: [
            "1. function myFunction()",
            "2. function = myFunction()",
            "3. function: myFunction()",
            "4. function_myFunction()",
        ],
        answer: "3. function: myFunction()",
    },

    {
        question:
            "Select the option that describes how to write an IF statement in JavaScript",
        choices: [
            "1. if i ==5 then",
            "2. if i = 5",
            "3. if i = 5 then",
            "4. if (i==5)",
        ],
        answer: "4. if (i==5)",
    },

    {
        question: "How does a FOR loop start?",
        choices: [
            "1. for i = 1 to 5",
            "2. for (1 <= 5, i++)",
            "3. for (i=0, i<=5, i++)",
            "4. for (i=0,i<=5)",
        ],
        answer: "3. for (i=0, i<=5, i++)",
    },

    {
        question: "How can you add a single line comment in a JavaScript?",
        choices: [
            "1. < !--This is a single line comment-- >",
            "2. * This is a single line comment*",
            "3. // This is a single line comment",
            "4. /* This is a single line comment */",
        ],
        answer: "3. // This is a single line comment",
    },

    {
        question: "How do you declare a JavaScript variable?",
        choices: [
            "1. var carName",
            "2. variable carName",
            "3. v carName",
            "4. vble carName",
        ],
        answer: "1. var carName",
    },

    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["1. onmouseover", "2. onmouseclick", "3. onclick", "4. onchange"],
        answer: "3. onclick",
    },
];


startButton.addEventListener('click', startGame);