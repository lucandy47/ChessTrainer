import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/game/services/game.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { PuzzleService } from 'src/app/game/services/puzzle.service';
import { OpeningService } from 'src/app/learn/services/opening.service';
import { Opening } from '../models/opening';
import { User } from 'src/app/authentication/model/user';
declare var ChessBoard:any;
const Chess = require('chess.js');
@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.css']
})
export class OpeningsComponent implements OnInit {

  constructor(private _gameService:GameService,private _authenticationService:AuthenticationService,private _openingService:OpeningService) { }
  game=new Chess();
  board:any;
  openings!:Opening[];
  user!:User;
  pgn:string="";
  eco:string="";
  description:string="";
  name:string="";
  moves!:string[];
  indexMove=0;


  ngOnInit(): void {

      this._openingService.getAllOpenings().subscribe(
        (data)=>{
          this.openings = data;
          console.log(this.openings);
        },
        (error)=>{
          console.log(error.message);
        });

        const self = this;
        var config = {
            draggable: true,
            position: 'start',
            onDragStart: function (source: any, piece: any, position: any, orientation: any,game:any) { return self._gameService.onDragStart(source, piece, position, orientation,self.game); },
            onDrop: function (source: any, target: any,game:any,pgn:string,status:string,player:string) { return self._gameService.onDrop(source, target,self.game,"solo",self.board,"",0); },
            onSnapEnd: function (board:any,game:any) { self._gameService.onSnapEnd(self.board,self.game); }
        }
        console.log(this.game.ascii());
        this.board=ChessBoard('game-board',config)
        if(this._authenticationService.isUserLoggedIn() === true)
      {
        this.user=this._authenticationService.getLoggedInUser();
      }
  }

      loadOpening(name:string){
        this.indexMove=0;
        this.board.position('start');
        this.game.reset();
        var opening:Opening=new Opening();
        for(let i=0;i<this.openings.length;i++){
          if(this.openings[i].name == name){
            opening=this.openings[i];
            break;
          }
        }   
            this.game.load(opening.fen);
            this.pgn = opening.pgn;
            this.eco = opening.eco;
            this.description = opening.description;
            this.name = opening.name;
            this.moves = this._gameService.getMovesFromAPgn(this.pgn);

      }

      forwardMove(){
        if(this.indexMove == 0){
          this.board.position('start');
          this.game.reset();
        }
        this.game.move(this.moves[this.indexMove]);
        this.board.position(this.game.fen());
        this.indexMove++;
        console.log(this.game.ascii());
      }

      undoMove(){
        this.indexMove--;
        this.game.undo();
        this.board.position(this.game.fen());
        
      }

}
