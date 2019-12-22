import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

export const quizTitles = ['Lernfeld 1', 'WiSo'];

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  @Input() activeQuiz;
  @Input() quizTitle;

  constructor(private router: Router) { }

  ngOnInit() {

    this.activeQuiz = this.router.url
      .replace("/","");

    // Set Quiz title
    if (this.activeQuiz == 'lf1') {
      this.quizTitle = quizTitles[0];
    } else if (this.activeQuiz == 'wiso') {
      this.quizTitle = quizTitles[1];
    }

  }

}
