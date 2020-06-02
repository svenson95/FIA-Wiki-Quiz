import { Component, Input, OnInit } from '@angular/core';
import { inFrameChanger } from "../service/inFrameChanger";

@Component({
  selector: 'app-wiki-quiz',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ngOnInit(): void {
    inFrameChanger();
  }

}
