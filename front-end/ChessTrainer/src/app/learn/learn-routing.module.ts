import { LearnComponent } from './learn/learn.component';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { OpeningsComponent } from './openings/openings.component';
import { TacticsComponent } from './tactics/tactics.component';

const routes: Route[] = [
  { path: '',component:LearnComponent,pathMatch:'full' },
  {path: 'tactics',component:TacticsComponent},
  {path:'openings',component:OpeningsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LearnRoutingModule { }
