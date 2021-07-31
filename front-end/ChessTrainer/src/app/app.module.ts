import { SharedModule } from './shared/shared.module';
import { LearnModule } from './learn/learn.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from '@angular/forms';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { PuzzleOptionsComponent } from './components/puzzle-options/puzzle-options.component';
import { PuzzleItemComponent } from './shared/puzzle-item/puzzle-item.component';
import { AllNewsComponent } from './components/all-news/all-news.component';
import { OpeningsComponent } from './learn/openings/openings.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddPuzzleComponent } from './components/add-puzzle/add-puzzle.component';
import { AddOpeningComponent } from './components/add-opening/add-opening.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NewsComponent,
    HomeComponent,
    MyProfileComponent,
    LogoutComponent,
    PuzzleOptionsComponent,
    AllNewsComponent,
    AdminPanelComponent,
    AddPuzzleComponent,
    AddOpeningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule
    ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
