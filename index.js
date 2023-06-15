
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
  if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function loadQuestions() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionByIndex().text;

      var choices = quiz.getQuestionByIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          handleOptionButton("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.checkOptionWithAnswer(choice);
      loadQuestions();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Here are your Results!</h1>";
  gameOverHTML += "<h3 id='score'> Your score is: " + quiz.score + ", and your percentage is: "+(quiz.score/questions.length*100)+"%"+"</h3>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};
var questions = [
  new Question("Javascript is an _______ language?", ["Object Oriented", "Object Based","Procedural", "None of the Above"], "Object Oriented"),
  new Question("Which of the following keywords is used to define a variable in Javascript?", ["var", "let", "Both A and B", "None"], "Both A and B"),
  new Question("Which of the following methods is used to access HTML elements using Javascript?", ["getElementbyId()", "getElementsByClassName()","Both A and B", "None"], "Both A and B"),
];

var quiz = new Quiz(questions);

loadQuestions();