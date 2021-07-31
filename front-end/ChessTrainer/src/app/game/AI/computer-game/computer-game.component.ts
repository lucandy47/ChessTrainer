import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { ChessEngineService } from '../chess-engine/chess-engine.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { User } from 'src/app/authentication/model/user';
import * as globals from '../../../globals';
declare var ChessBoard:any;
const Chess = require('chess.js');
@Component({
  selector: 'app-computer-game',
  templateUrl: './computer-game.component.html',
  styleUrls: ['./computer-game.component.css']
})
export class ComputerGameComponent implements OnInit {

  game=new Chess();
  pgn:string="";
  status:string="";
  originalFen:string="";
  fenHistory:string[]=[];
  board:any;
  playerOne:string="";
  playerTwo:string=""; 
  player!:string;
  user!:User;
  depth:number=2;
  constructor(private _gameService:GameService,private _engingeService:ChessEngineService,private _authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    const self = this;
    var config = {
      draggable: true,
      position: 'start',
      onDragStart: function (source: any, piece: any, position: any, orientation: any,game:any) { return self._gameService.onDragStart(source, piece, position, orientation,self.game); },
      onDrop: function (source: any, target: any,game:any,pgn:string,status:string,player:string) { return self._gameService.onDrop(source, target,self.game,"computer",self.board,self.player,self.depth); }, 
      onSnapEnd: function (board:any,game:any) { self._gameService.onSnapEnd(self.board,self.game); }
    }

    console.log(this.game.ascii());
    this.board=ChessBoard('game-board',config)
    this._gameService.updateStatusAndPgn(this.game);
    this.originalFen=this.game.fen();
    this.player=this.game.turn();
    

    if(this._authenticationService.isUserLoggedIn()){
      this.user=this._authenticationService.getLoggedInUser();
      this.playerOne=this.user.username;
    }else{
      this.playerOne=globals.guestPlayerOne;
    }
    this.playerTwo="Joe, the easy AI";
  }

  changeColorForPlayer(){
    if(this.player == 'w'){
      this.player = 'b';
    }else if(this.player == 'b'){
      this.player = 'a';
    }
    if(this.player == 'b'){
      setTimeout(()=>{this._engingeService.makeAImove(this.game,this.board,this.player,this.depth)},50);
    }
  }
  getStatus(){
    this.status=this._gameService.getStatus();
    return this.status;
  }
  getPgn(){
    this.pgn=this._gameService.getPgn();
    return this.pgn;
  }

  undoMove(){
    this._gameService.undoMove(this.game,this.board);
  }
  restartPosition(){
    this._gameService.restartPosition(this.game,this.board,this.originalFen);
    this.player='w';
    if(this._authenticationService.isUserLoggedIn()){
      this.user=this._authenticationService.getLoggedInUser();
      this.playerOne=this.user.username;
    }else{
      this.playerOne=globals.guestPlayerOne;
    }
    this.playerTwo="Joe, the easy AI";
  }
  changeSides(){
    if(this.player == 'w'){
      this.player = 'b';
    }else if(this.player == 'b'){
      this.player = 'w';
    }
    if(this.player == 'b'){
      this._engingeService.makeAImove(this.game,this.board,this.player,this.depth);
    }
    let aux=this.playerOne;
    this.playerOne=this.playerTwo;
    this.playerTwo=aux;
    console.log(this.player);
  }
  flipBoard(){
    this._gameService.flipBoard(this.board);
  }
  
  switchDifficulty(){
    if(this.depth == 2){
      this.depth = 3;
      this.playerTwo = "Bobby, the medium AI";
    }else{
      this.depth = 2;
      this.playerTwo = "Joe, the easy AI";
    }
    console.log(this.depth);
  }

}
