import { AuthenticationService } from './authentication/services/authentication.service';
import { PuzzleService } from './game/services/puzzle.service';
import { Component, OnInit } from '@angular/core';
import * as globals from '../app/globals';
import { Puzzle } from './game/models/puzzle';
import { MessengerService } from './services/messenger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public _authenticationService: AuthenticationService){
    
  }
  ngOnInit(): void {
    
  }
  

}
