import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from '../components/start/start.component';
import { GameComponent } from '../components/game/game.component';
import { PageNotFoundComponent } from '../components/pagenotfound/pagenotfound.component';
import {EndComponent} from "../components/end/end.component";


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'start', component: StartComponent },
  { path: 'game', component: GameComponent },
  { path: 'end', component: EndComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
