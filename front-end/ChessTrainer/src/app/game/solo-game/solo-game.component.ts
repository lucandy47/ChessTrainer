import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import * as globals from '../../globals';
import { User } from 'src/app/authentication/model/user';
declare var ChessBoard:any;
const Chess = require('chess.js');

@Component({
  selector: 'app-solo-game',
  templateUrl: './solo-game.component.html',
  styleUrls: ['./solo-game.component.css']
})
export class SoloGameComponent implements OnInit {

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
  constructor(private _gameService:GameService,private _authenticationService:AuthenticationService) {
    
   }

  ngOnInit(): void {
    const self = this;
    var config = {
      draggable: true,
      position: 'start',
      onDragStart: function (source: any, piece: any, position: any, orientation: any,game:any) { return self._gameService.onDragStart(source, piece, position, orientation,self.game); },
      onDrop: function (source: any, target: any,game:any,pgn:string,status:string,player:string) { return self._gameService.onDrop(source, target,self.game,"solo",self.board,self.player,0); },
      onSnapEnd: function (board:any,game:any) { self._gameService.onSnapEnd(self.board,self.game); }
    }
    console.log(this.game.ascii());
    this.board=ChessBoard('game-board',config)
    this._gameService.updateStatusAndPgn(this.game);
    this.player=this.game.turn();
    this.originalFen=this.game.fen();

    if(this._authenticationService.isUserLoggedIn()){
      this.user=this._authenticationService.getLoggedInUser();
      this.playerOne=this.user.username;
    }else{
      this.playerOne=globals.guestPlayerOne;
    }
    this.playerTwo=globals.guestPlayerTwo;

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
      this._gameService.setPgn(this.game.pgn());
    }
    restartPosition(){
      this._gameService.restartPosition(this.game,this.board,this.originalFen);
    }
    changeSides(){
        this._gameService.flipBoard(this.board);
        let aux=this.playerOne;
        this.playerOne=this.playerTwo;
        this.playerTwo=aux;
      
    }
    flipBoard(){
        this._gameService.flipBoard(this.board);
    }
    
}
