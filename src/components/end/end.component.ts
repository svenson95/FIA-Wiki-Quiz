import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {quizTitles} from "../start/start.component";
import {inFrameChanger} from "../../service/inFrameChanger";

let congratulationText = [
  'Du hast den Quiz ohne Fehler abgeschlossen',
  'Du hattest einen Fehler, schon mal nicht schlecht',
  'Du hattest zwei Fehler, probiere es nochmal',
  'Du hattest drei Fehler, probiere es nochmal',
  'Du hattest vier Fehler, probiere es nochmal',
  'Du hattest fünf Fehler, probiere es nochmal',
  'Du hattest mehr als 5 Fehler, probiere es nochmal',
];

let congratulationEmoji = [
  '&#11088;',
  '&#128077;',
  '&#128528;',
  '&#128562;',
  '&#129320;',
  '&#128550;',
  '&#128565;',
];

let quizUrl;

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  @Input() quiz_url = quizUrl;
  @Input() quizTitle;

  constructor(private router: Router) { }

  ngOnInit() {

    inFrameChanger();

    quizUrl = String(this.router.url)
      .replace("/","")
      .replace("/game", "")
      .replace("/end", "");

    this.quiz_url = quizUrl;

    // Set Quiz title
    if (this.quiz_url == 'lf1') {
      this.quizTitle = quizTitles[0];
    } else if (this.quiz_url == 'wiso') {
      this.quizTitle = quizTitles[1];
    }

    const questionCounter = document.getElementById('questionCounter');
    const questionCounterScore = localStorage.getItem('questionCounterScore');
    questionCounter.innerText = questionCounterScore;

    const mistakeCounter = document.getElementById('score');
    let mistakeCounterScore = localStorage.getItem('mistakeCounterScore');
    mistakeCounter.innerText = mistakeCounterScore;

    // Set mistake counter to the highest related by the amount of different congratulationTexts to show
    if (Number(mistakeCounterScore) > 5) {
      mistakeCounterScore = "6"
    }

    const congratLabel = document.getElementById('congratText');
    congratLabel.innerText = congratulationText[mistakeCounterScore];

    const congratEmoji = document.getElementById('congratEmoji');
    congratEmoji.innerHTML = congratulationEmoji[mistakeCounterScore];

    window.scrollTo({left: 0 , top: 100, behavior: 'auto'});
  }

}
