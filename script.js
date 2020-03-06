//Get the container and button ids
var startButton = document.querySelector("#start-button");
var questionContainer = document.querySelector("#question-container");
var buttonContainer = document.querySelector("#button-container");

//Set up the question object
var question = [
    {
        question: "What foot do you start walking with?",
        answers: ["Right", "Left", "I don't have legs"],
        answer: 1
    },
    {
        question: "What is the worst clothing article?",
        answers: ["Shirts", "Socks", "Shoes"],
        answer: 2
    },
    {
        question: "Which finger is the best finger?",
        answers: ["Pinky", "Thumb", "Pointer"],
        answer: 3
    },
    {
        question: "What is the correct amount of pillows to sleep on?",
        answers: ["0", "1", "2"],
        answer: 3
    },
    {
        question: "Question. What's the answer?",
        answers: ["The real answer", "No I'm the real answer", "I'm not the real answer"],
        answer: 3
    }
];

var questionCount = 0;
var score = 0;
var interval;
var totalSeconds = 999;

function startQuiz() {
    changeStartContent();
    startTime();
    addQuestions();
}

function changeStartContent() {
    document.body.style.backgroundColor = "#2C2C34";
    startButton.parentNode.removeChild(startButton);
    questionContainer.style.color = "#fff";
}

function addQuestions() {
    for(var i = 0; i < question.length; i++) {
        if (questionCount === i) {
            question[i].answers.forEach((answer, index) => {
                var btn = document.createElement("button");
                questionContainer.textContent = question[i].question;
                btn.setAttribute("class", "btn question-button");
                btn.setAttribute("id", "btn-" + index);
                btn.textContent = answer;
                btn.addEventListener("click", (event) => {
                    // Add one to the index to check answer
                    if (question[questionCount].answer === index + 1) {
                        // Right Answer
                        // score++;
                        // addScore();
                        //Need to reset content for the next button, might combine the changeStartContent() and removeContent into one function
                        totalSeconds += 10;
                        questionCount++;
                        removeContent();
                        
                    } else {
                        // Wrong Answer
                        //Gonna remove some of the timer
                        totalSeconds -= 10;
                    }
                });
                buttonContainer.appendChild(btn);
            });
        } else if (questionCount === question.length) {
            clearInterval(interval);
            questionContainer.textContent = "Congratulations you've won!";
        }
    }
}

//Change to edit the text content inside of the buttons
function removeContent() {
    for (var i = 0; i < 3; i++) {
        var btn = document.querySelector("#btn-0");
        var btn1 = document.querySelector("#btn-1");
        var btn2 = document.querySelector("#btn-2");
        btn.parentNode.removeChild(btn);
        btn1.parentNode.removeChild(btn1);
        btn2.parentNode.removeChild(btn2);
        addQuestions();
    }
}

//Unused at the moment
function addScore() {
    questionContainer.textContent = "Your score is now " + score;
}


function startTime() {
    var timerArea = document.querySelector("#timer-area");
    var timerElement = document.createElement("p");
    interval = setInterval(function() {
        totalSeconds--;
        timerElement.textContent = "Seconds left: " + totalSeconds;
        timerArea.appendChild(timerElement); // Displays on the timer area div
        if (totalSeconds <= 0) {
            clearInterval(interval);
            alert("Game Over");
        }
    }, 1000); // Milliseconds, determine how often the function is called
}

startButton.addEventListener("click", startQuiz);