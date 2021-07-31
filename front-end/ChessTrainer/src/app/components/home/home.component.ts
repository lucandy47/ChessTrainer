import { AuthenticationService } from './../../authentication/services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from 'src/app/game/models/puzzle';
import { PuzzleService } from 'src/app/game/services/puzzle.service';
import * as globals from '../../globals';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { Player } from '../models/player';
import { PlayerService } from 'src/app/services/player.service';
declare var ChessBoard:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  board:any;
  dailyPuzzleBoard:any;
  dailyPuzzle!:Puzzle;
  players:Player[]=[];
  constructor(public _service:AuthenticationService,private puzzleService:PuzzleService,private _router: Router,
    private _playerService:PlayerService) {
    
   }

  ngOnInit(): void {
    this.createDailyPuzzle();
    this.board=ChessBoard('board1',{
      position:'start',
      draggable:false
      
    })
    this._playerService.getPlayers().subscribe(
      (data)=>{
        console.log(data);
        this.players=data;
      },
      (error)=>{
        console.log(error.message);
      }
    )
    
  }
  private createDailyPuzzle(){
    this.puzzleService.getDailyPuzzle().subscribe(
        data=>{
          console.log(data.pgn);
          this.dailyPuzzle=data;
          this.dailyPuzzleBoard=ChessBoard('dailyPuzzle',{
            position:data.fen,
            draggable:false
          })
          
        },
        err=>{
          console.log(err.message);
        }
      )
  }
  viewDailyPuzzle(id:number){
    this._router.navigate(['game/puzzle',id]);   
  }
 
  
}
