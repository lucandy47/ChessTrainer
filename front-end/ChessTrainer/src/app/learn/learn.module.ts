import { SharedModule } from './../shared/shared.module';
import { LearnRoutingModule } from './learn-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn/learn.component';
import { OpeningsComponent } from './openings/openings.component';
import { TacticsComponent } from './tactics/tactics.component';



@NgModule({
  declarations: [LearnComponent,OpeningsComponent, TacticsComponent],
  imports: [
    CommonModule,
    LearnRoutingModule,
    SharedModule
    ],
  exports:[],
  providers: []
})
export class LearnModule { }
