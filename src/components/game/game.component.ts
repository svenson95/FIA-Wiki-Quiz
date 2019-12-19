import { Component, OnInit } from '@angular/core';

let question: HTMLElement;
let choices = [];
let questionCounterText: HTMLElement;
let scoreText: HTMLElement;

let score = 0;
let questionCounter = 0;
let currentQuestion;
let acceptingAnswers = false;
let availableQuestions = [];

const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    choices = Array.from(document.getElementsByClassName('choice-text'));

    this.startGame();
    choices.forEach(choice => {
      choice.addEventListener('click', element => {
        if (!acceptingAnswers) { return; }

        acceptingAnswers = false;
        const selectedChoice = element.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
          this.incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
          this.getNewQuestion();
          selectedChoice.parentElement.classList.remove(classToApply);
        }, 1500);

      });
    });

  }

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ... questions];
    this.getNewQuestion();
  }

  getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ) {
      // Got to the end page
      return window.location.assign('/end.html');
    }

    scoreText = document.getElementById('score');
    questionCounterText = document.getElementById('questionCounter');
    question = document.getElementById('question');

    questionCounter++;
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
      const choiceNumber = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + choiceNumber];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
  }

  incrementScore = num => {
    score += num;
    scoreText.innerText = String(score);
  }

}
