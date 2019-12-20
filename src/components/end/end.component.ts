import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const mistakeCounter = document.getElementById('score');
    const mistakeCounterScore = localStorage.getItem('mistakeCounterScore');

    mistakeCounter.innerText = mistakeCounterScore;

    const congratLabel = document.getElementById('congratText');
    congratLabel.innerText = congratulationText[mistakeCounterScore];

    const congratEmoji = document.getElementById('congratEmoji');
    congratEmoji.innerHTML = congratulationEmoji[mistakeCounterScore];

    window.scrollTo({left: 0 , top: 80, behavior: 'smooth'});
  }

}
