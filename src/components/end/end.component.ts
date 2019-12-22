import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {quizTitles} from "../start/start.component";

let congratulationText = [
  'Du hast den Quiz ohne Fehler abgeschlossen',
  'Du hattest einen Fehler, schon mal nicht schlecht',
  'Du hattest zwei Fehler, probiere es nochmal',
  'Du hattest drei Fehler, probiere es nochmal',
  'Du hattest vier Fehler, probiere es nochmal',
  'Du hattest fünf Fehler, probiere es nochmal',
  'Du hattest sechs Fehler, probiere es nochmal',
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

  @Input() activeQuiz = quizUrl;
  @Input() quizTitle;

  constructor(private router: Router) { }

  ngOnInit() {

    quizUrl = String(this.router.url)
      .replace("/","")
      .replace("/game", "")
      .replace("/end", "");

    this.activeQuiz = quizUrl;

    // Set Quiz title
    if (this.activeQuiz == 'lf1') {
      this.quizTitle = quizTitles[0];
    } else if (this.activeQuiz == 'wiso') {
      this.quizTitle = quizTitles[1];
    }

    const mistakeCounter = document.getElementById('score');
    const mistakeCounterScore = localStorage.getItem('mistakeCounterScore');

    mistakeCounter.innerText = mistakeCounterScore;

    const congratLabel = document.getElementById('congratText');
    congratLabel.innerText = congratulationText[mistakeCounterScore];

    const congratEmoji = document.getElementById('congratEmoji');
    congratEmoji.innerHTML = congratulationEmoji[mistakeCounterScore];

    window.scrollTo({left: 0 , top: 70, behavior: 'auto'});
  }

}
