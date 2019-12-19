import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from '../components/start/start.component';
import { GameComponent } from '../components/game/game.component';
import { PageNotFoundComponent } from '../components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'start', component: StartComponent },
  { path: 'game', component: GameComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
            routes,
            { enableTracing: true }   // <-- debugging purposes only
            )],
  exports: [RouterModule]
})
export class AppRoutingModule { }