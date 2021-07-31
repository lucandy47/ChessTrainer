import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { SoloGameComponent } from './solo-game/solo-game.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { ComputerGameComponent } from './AI/computer-game/computer-game.component';
import { LoginComponent } from '../authentication/login/login.component';



@NgModule({
  declarations: [SoloGameComponent, PuzzleComponent, ComputerGameComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
