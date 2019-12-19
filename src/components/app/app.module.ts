import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StartComponent } from '../start/start.component';
import { GameComponent } from '../game/game.component';
import { PageNotFoundComponent } from '../pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    GameComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
