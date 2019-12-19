import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from '../components/start/start.component';
import { GameComponent } from '../components/game/game.component';
import { PageNotFoundComponent } from '../components/pagenotfound/pagenotfound.component';

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
