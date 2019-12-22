import {Component, Input, OnInit} from '@angular/core';
import lf1_questions from "../../data/lf1-questions";
import wiso_questions from "../../data/wiso-questions";
import {Router} from "@angular/router";
import {quizTitles} from "../start/start.component";

let quizId = [];
let quizUrl;

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

  @Input() activeQuiz = quizUrl;
  @Input() quizTitle;

  constructor(private router: Router) { }

  ngOnInit() {

    quizUrl = String(this.router.url)
        .replace("/","")
        .replace("/game", "");

    this.activeQuiz = quizUrl;

    if (quizUrl == 'lf1') {
      quizId = lf1_questions;
    } else if (quizUrl == 'wiso') {
      quizId = wiso_questions;
    }

    // Set Quiz title
    if (this.activeQuiz == 'lf1') {
      this.quizTitle = quizTitles[0];
    } else if (this.activeQuiz == 'wiso') {
      this.quizTitle = quizTitles[1];
    }

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
          window.scrollTo({left: 0 , top: 125, behavior: 'auto'});

        }, 1000);

      });
    });

  }

  startGame = () => {
    questionCounter = 0;
    mistakeCounter = 0;
    availableQuestions = [ ... quizId];
    this.getNewQuestion();
    window.scrollTo({left: 0 , top: 125, behavior: 'auto'});
  };

  getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= quizId.length) {
      // Got to the end page
      localStorage.setItem('mistakeCounterScore', String(mistakeCounter));
      return window.location.assign(`${quizUrl}/end`);
    }

    mistakeCounterElement = document.getElementById('score');
    questionCounterElement = document.getElementById('questionCounter');
    question = document.getElementById('question');

    questionCounter++;
    questionCounterElement.innerText = `${questionCounter} / ${quizId.length}`;

    // Update progress bar value
    progressBar = document.getElementById('progress');
    progressBar.style.width = `${((questionCounter - 1) / quizId.length) * 100}%`;

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
