// script.js

// Quiz questions array
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hot Mail", "How to Make Lasagna", "Hyperlinks and Text Markup Language"],
        answer: 0
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create function myFunction()"],
        answer: 0
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["color", "text-color", "font-color", "bg-color"],
        answer: 0
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["myFunction()", "call function myFunction", "call myFunction()", "execute myFunction()"],
        answer: 0
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create function myFunction()"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('submit-button').addEventListener('click', handleSubmit);

function startQuiz() {
    document.getElementById('initial-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    displayQuestion();
    startTimer(); // Start the timer when the quiz starts
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="option" value="${index}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsElement.appendChild(optionElement);
    });

    updateProgressBar();
}

function handleSubmit() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer == questions[currentQuestionIndex].answer) {
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            resetTimer();
        } else {
            showSummary();
        }
    } else {
        alert("Please select an answer!");
    }
}

function startTimer() {
    clearInterval(timerInterval); // Clear any existing intervals
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleSubmit();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    document.getElementById('time-left').textContent = timeLeft;
    startTimer();
}

function showSummary() {
    document.getElementById('quiz-container').innerHTML = `<h1>Your score is: ${score}</h1>`;
    clearInterval(timerInterval);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}
