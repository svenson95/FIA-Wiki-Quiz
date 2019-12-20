import { Component, OnInit } from '@angular/core';

let question: HTMLElement;
let choices = [];
let progressText: HTMLElement;
let progressBarFull: HTMLElement;

let failuresCounterText: HTMLElement;
let failureCounter = 0;
let questionCounterText: HTMLElement;
let questionCounter = 0;

let currentQuestion;
let acceptingAnswers = false;
let availableQuestions = [];

const questions = [
  {
    question: 'Wie kann man den Begriff Bedürfnis definieren?',
    choice1: 'Ein Bedürfnis ist eine Mangelerscheinung mit dem Ziel diese zu beseitigen',
    choice2: 'Ein Bedürfnis ist die Nachfrage nach einem beliebigem Gut',
    choice3: 'Ein Bedürfnis entsteht durch die Nachfrage',
    choice4: 'Ein Bedürfnis ist etwas was Menschen wollen',
    answer: 1
  },
  {
    question: "Wie werden aus einem Bedürfnis der Bedarf und daraus die Nachfrage?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "Das Bedürfnis muss realisierbar sein. Dazu zählt, dass das Gut auf dem Markt vorhanden ist und der Kunde es sich leisten kann. Durch Kaufentschluss wird der Bedarf zur Nachfrage.",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "Was besagt das Ökonomische Prinzip?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "Dass eine vorbestimmte Leistung mit möglichst geringen Mitteln erzielt werden soll, dabei aber die größtmögliche Leistung mit minimalen Mitteln",
    answer: 4
  }
];

// CONSTANTS

const FAILURE_VALUE = 1;
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

        if (classToApply === 'incorrect') {
          this.incrementFailures(FAILURE_VALUE);
        }

        selectedChoice.parentElement.classList.add(selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect');

        setTimeout( () => {
          this.getNewQuestion();
          selectedChoice.parentElement.classList.remove(classToApply);
          const titleElement = document.querySelector('menu');
          window.scrollTo({left: 0 , top: 80, behavior: 'smooth'});
        }, 1500);

      });
    });

  }

  startGame = () => {
    questionCounter = 0;
    failureCounter = 0;
    availableQuestions = [ ... questions];
    this.getNewQuestion();
    window.scrollTo({left: 0 , top: 80, behavior: 'smooth'});
  };

  getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ) {
      // Got to the end page
      return window.location.assign('/end.html');
    }

    failuresCounterText = document.getElementById('score');
    questionCounterText = document.getElementById('questionCounter');
    progressText = document.getElementById('progressText');
    question = document.getElementById('question');

    questionCounter++;
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;

    // Update progress bar value
    progressBarFull = document.getElementById('progressBarFull');
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
      const choiceNumber = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + choiceNumber];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
    document.documentElement.scrollTop = 20;
  };

  incrementFailures = num => {
    failureCounter += num;
    failuresCounterText.innerText = String(failureCounter);
  }

}
