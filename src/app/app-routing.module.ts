import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from '../components/start/start.component';
import { GameComponent } from '../components/game/game.component';
import { PageNotFoundComponent } from '../components/pagenotfound/pagenotfound.component';
import {EndComponent} from "../components/end/end.component";
import lf1_questions from "../data/lf1-questions";

const routes: Routes = [
  { path: ':id', component: StartComponent, data: { id: 'lf1' } },
  { path: ':id', component: StartComponent, data: { id: 'wiso' } },
  { path: ':id/game', component: GameComponent },
  { path: ':id/end', component: EndComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
