import { Component, OnInit } from '@angular/core';

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
    window.scrollTo({left: 0 , top: 80, behavior: 'smooth'});
  }

}
