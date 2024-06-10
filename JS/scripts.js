const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

const questions = [
  {
    "question": "Onde foi feito a Copa do Mundo de 2014?",
    "answers": [
      {
        "answer": "Espanha",
        "correct": false
      },
      {
        "answer": "Alemanha",
        "correct": false
      },
      {
        "answer": "Brasil",
        "correct": true
      },
      {
        "answer": "Rússia",
        "correct": false
      },
    ]
  },
  {
    "question": "Quantos jogadores jogam uma partida de futebol?",
    "answers": [
      {
        "answer": "10",
        "correct": false
      },
      {
        "answer": "22",
        "correct": true
      },
      {
        "answer": "11",
        "correct": false
      },
      {
        "answer": "10",
        "correct": false
      },
    ]
  },
  {
    "question": "Quem é o detentor do recorde de mais títulos de Copa do Mundo?",
    "answers": [
      {
        "answer": "Pelé",
        "correct": true
      },
      {
        "answer": "Matthäus",
        "correct": false
      },
      {
        "answer": "Maradona",
        "correct": false
      },
      {
        "answer": "Puskas",
        "correct": false
      },
    ]
  },
]

function init() {
  createQuestion(0)
}

function createQuestion(i) {

  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  questions[i].answers.forEach(function(answer, i) {
    
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    answersBox.appendChild(answerTemplate);

  });

  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  actualQuestion++;

}

function checkAnswer(btn, buttons) {
  
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      if(btn === button) {
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }

  });

  nextQuestion();

}

function nextQuestion() {

  setTimeout(function() {

    if(actualQuestion >= questions.length) {
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion)

  }, 1000);

}

function showSuccessMessage() {

  hideOrShowQuizz();

  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

init();