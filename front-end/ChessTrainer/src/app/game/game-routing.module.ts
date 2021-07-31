import { PuzzleComponent } from './puzzle/puzzle.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SoloGameComponent } from './solo-game/solo-game.component';
import { ComputerGameComponent } from './AI/computer-game/computer-game.component';

const routes: Route[] = [
  { path: '',component:SoloGameComponent,pathMatch:'full' },
  { path: 'puzzle/:id',component:PuzzleComponent },
  {path:'computer',component:ComputerGameComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }