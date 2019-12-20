import { Component, OnInit } from '@angular/core';
import lf1_questions from "../../data/lf1-questions";

let question: HTMLElement;
let choices = [];
let progressText: HTMLElement;
let progressBarFull: HTMLElement;

let mistakeCounterElement: HTMLElement;
let mistakeCounter = 0;
let questionCounterElement: HTMLElement;
let questionCounter = 0;

let currentQuestion;
let acceptingAnswers = false;
let availableQuestions = [];

const FAILURE_VALUE = 1;
const MAX_QUESTIONS = 4;

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
          window.scrollTo({left: 0 , top: 125, behavior: 'smooth'});
        }, 1000);

      });
    });

  }

  startGame = () => {
    questionCounter = 0;
    mistakeCounter = 0;
    availableQuestions = [ ... lf1_questions];
    this.getNewQuestion();
    window.scrollTo({left: 0 , top: 125, behavior: 'smooth'});
  };

  getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ) {
      // Got to the end page
      localStorage.setItem('mistakeCounterScore', String(mistakeCounter));
      return window.location.assign('end');
    }

    mistakeCounterElement = document.getElementById('score');
    questionCounterElement = document.getElementById('questionCounter');
    progressText = document.getElementById('progressText');
    question = document.getElementById('question');

    questionCounter++;
    questionCounterElement.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;

    // Update progress bar value
    progressBarFull = document.getElementById('progress');
    progressBarFull.style.width = `${((questionCounter - 1) / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
      const choiceNumber = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + choiceNumber];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
  };

  incrementFailures = num => {
    mistakeCounter += num;
    mistakeCounterElement.innerText = String(mistakeCounter);
  };

}
