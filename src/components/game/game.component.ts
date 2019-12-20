import { Component, OnInit } from '@angular/core';
import lf1_questions from "../../data/lf1-questions";

let question: HTMLElement;
let currentQuestion;
let choices = [];
let availableQuestions = [];
let acceptingAnswers = false;

let mistakeCounterElement: HTMLElement;
let questionCounterElement: HTMLElement;
let mistakeCounter = 0;
let questionCounter = 0;

let progressBar: HTMLElement;

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

        const selectedElement = element.target;
        const selectedAnswer = selectedElement.dataset['number'];

        const correctClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (correctClass === 'incorrect') {
          this.incrementMistakes(1);
        }

        selectedElement.parentElement.classList.add(selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect');

        setTimeout( () => {

          this.getNewQuestion();
          selectedElement.parentElement.classList.remove(correctClass);
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

    if (availableQuestions.length === 0 || questionCounter >= lf1_questions.length) {
      // Got to the end page
      localStorage.setItem('mistakeCounterScore', String(mistakeCounter));
      return window.location.assign('end');
    }

    mistakeCounterElement = document.getElementById('score');
    questionCounterElement = document.getElementById('questionCounter');
    question = document.getElementById('question');

    questionCounter++;
    questionCounterElement.innerText = `${questionCounter} / ${lf1_questions.length}`;

    // Update progress bar value
    progressBar = document.getElementById('progress');
    progressBar.style.width = `${((questionCounter - 1) / lf1_questions.length) * 100}%`;

    // Random question order
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
      const choiceNumber = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + choiceNumber];
    });

    // Delete answered question
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };

  incrementMistakes = num => {
    mistakeCounter += num;
    mistakeCounterElement.innerText = String(mistakeCounter);
  };

}
