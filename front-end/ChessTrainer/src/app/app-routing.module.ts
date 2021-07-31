import { AddPuzzleComponent } from './components/add-puzzle/add-puzzle.component';
import { PuzzleOptionsComponent } from './components/puzzle-options/puzzle-options.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AllNewsComponent } from './components/all-news/all-news.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddOpeningComponent } from './components/add-opening/add-opening.component';
import { AuthenticationGuardService } from './authentication/services/authentication-guard.service';

const routes: Routes = [
  {path:'',component:HomeComponent, pathMatch:'full'},
  {path:'logout',component:LogoutComponent, canActivate:[AuthenticationGuardService]},
  {path:'register',component:RegisterComponent},
  {path:'my-profile',component:MyProfileComponent, canActivate:[AuthenticationGuardService]},
  {path:'puzzles',component:PuzzleOptionsComponent},
  {path:'news',component:AllNewsComponent},
  {path:'admin-panel',component:AdminPanelComponent, canActivate:[AuthenticationGuardService], data:{role:"admin"}},
  {path:'add-puzzle',component:AddPuzzleComponent,canActivate:[AuthenticationGuardService], data:{role:"admin"}},
  {path:'add-opening',component:AddOpeningComponent,canActivate:[AuthenticationGuardService], data:{role:"admin"}},
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(mod => mod.GameModule)
  },
  {
    path: 'learn',
    loadChildren: () => import('./learn/learn.module').then(mod => mod.LearnModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
