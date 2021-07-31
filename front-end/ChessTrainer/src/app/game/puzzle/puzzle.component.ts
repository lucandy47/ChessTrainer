import { PuzzleService } from 'src/app/game/services/puzzle.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Puzzle } from '../models/puzzle';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/authentication/model/user';
declare var ChessBoard:any;
const Chess = require('chess.js');

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})

export class PuzzleComponent implements OnInit {

  game=new Chess();
  moves_history!:string[];
  correctMoves!:boolean[];
  board:any;
  playerOne:string="";
  id:any;
  puzzle!:Puzzle;
  player!:string;
  status:string="";
  puzzleType:string="";
  playerToMove:string="";
  originalFen:string="";
  solutionMoves!:string[];
  puzzles:Puzzle[]=[];
  lastId!:number;
  user!:User;
  alreadySolved!:boolean;

  

  constructor(private _gameService:GameService,private _authenticationService:AuthenticationService,private _activatedRoute: ActivatedRoute,
    private _puzzleService:PuzzleService,private _router:Router) {
      this.alreadySolved=false;
   
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.pipe(
      switchMap(params => 
        {
        this.id = +params.get('id')!;
      return  this._puzzleService.getPuzzleById(+params.get('id')!)
        })
    ).subscribe((data)=>
    {
      this.puzzle=data;
      console.log(this.puzzle);
      this.buildGame(this.puzzle);
      this.status="progress";
      this.restartPosition();
      if(this._authenticationService.isUserLoggedIn() === true)
      {
        this.user=this._authenticationService.getLoggedInUser();
        console.log(this.user);
        this._puzzleService.getSolvedPuzzle(this.user.id,this.id).subscribe(
          (data)=>
          {
            console.log(data);
            if(data !== null){
              this.alreadySolved=data.solved;
            }else{
              this.alreadySolved=false;
            }
            
            console.log(this.alreadySolved);
          },
        (error)=>
        {
          console.log('Eroare '+error.message);
        })
      }
    },
    error=>
    {
      console.log(error);
    });    
    this._puzzleService.getAllPuzzles().subscribe(
      (data)=>
      {
          this.puzzles=data;
          this.lastId=this.puzzles[this.puzzles.length-1].id;
      },
      (error)=>
      {
        console.log('Eroare la preluarea problemei de sah '+error.error);
      }
    )
  }

  getSolutionMoves(){
    return this._gameService.getSolution(this.puzzle.pgn); 
  }

  getCurrentPgn(){
    var currentPgn = this._gameService.getPgn();
    if(this.player == 'b'){
      currentPgn=currentPgn.slice(77);
      currentPgn='1'+currentPgn;
    }else{
      currentPgn=currentPgn.slice(77);
    }
    return currentPgn;
  }

  getPuzzleHistory(){
    return this._gameService.getPuzzleHistory();
  }

  getCorrectMoves(){
    return this._gameService.getMovesType();
  }

  savePuzzleSolved(){
    if(this.status == "solved"){
      if(this.alreadySolved == false && this._authenticationService.isUserLoggedIn() === true){
        var solvedPuzzle = {user:this.user,puzzle:this.puzzle,solved:true};
        this._puzzleService.addSolvedPuzzle(solvedPuzzle).subscribe(
          data=>{
            console.log(data);
          },
          error=>{
            console.log("eroare la trimitere "+error.message);
          }
        )
        
      }
    }

  }
  createMovesMap(){
    let movesMap: any[]=[];
    let ok=false;
    this.solutionMoves=this.getSolutionMoves();
    this.moves_history=this.getPuzzleHistory();
    this.correctMoves=this.getCorrectMoves();
    for(let i=0;i<this.moves_history.length;i++){
        movesMap.push({move:this.moves_history[i],correct:this.correctMoves[i]})
        if(this.correctMoves[i] == false || this.game.in_draw()){
            this.status="lost";
            break;
        }
    }
    if(this.solutionMoves.length == this.moves_history.length){
      for(let i=0;i<this.solutionMoves.length;i++){
          if(this.solutionMoves[i] === this.moves_history[i]){
              ok=true;
          }else{
            ok=false;
          }
      }
    }
    if(ok == true){
      this.status="solved";
    }

    return movesMap;
  }

  buildGame(puzzle:Puzzle){
    const self=this;
    if (this.board) {
      this.board.destroy();
    }
    this.board = ChessBoard('game-board', {
      draggable: true,
      position: puzzle.fen,
      onDragStart: function (source: any, piece: any, position: any, orientation: any,game:any) { return self._gameService.onDragStart(source, piece, position, orientation,self.game); },
      onDrop: function (source: any, target: any,game:any,player:string,pgn:string) { return self._gameService.onDropPuzzle(source, target,self.game,self.player,puzzle.pgn); },
      onSnapEnd: function (board:any,game:any) { self._gameService.onSnapEnd(self.board,self.game); }
    });
    this.game.load(puzzle.fen);
    this.player=this.game.turn();
    if(this.player == 'b'){
      this.playerToMove="Black to move first"
    }else{
      this.playerToMove="White to move first"
    }
    this.checkTypeOfPuzzle(puzzle);
    this.originalFen=puzzle.fen;
  }

  checkTypeOfPuzzle(puzzle:any){
    if(puzzle.type=="mate_in_2"){
      return this.puzzleType="Mate in 2 moves"
    }else if(puzzle.type=="mate_in_3"){
      return this.puzzleType="Mate in 3 moves"
    }else if(puzzle.type=="mate_in_4"){
      return this.puzzleType="Mate in 4 moves"
    }else if(puzzle.type=="dbl_att"){
      return this.puzzleType="Double attack and fork attack"
    }else if(puzzle.type=="disc_att"){
      return this.puzzleType="Attack by discovery"
    }else if(puzzle.type=="pin"){
      return this.puzzleType="Pinning"
    }else if(puzzle.type=="overloading"){
      return this.puzzleType="Pieces overloading"
    }else{
      return this.puzzleType="Winning sacrifices"
  }
  }

  restartPosition(){
    this._gameService.restartPosition(this.game,this.board,this.originalFen);
    this.status="progress";
  }
  
  flipBoard(){
    this._gameService.flipBoard(this.board);
  }
  nextPuzzle(){
    let newId=this.id+1;
    this._router.navigate(['game/puzzle',newId]); 
    this.savePuzzleSolved();
  }
  previousPuzzle(){
    let newId=this.id-1;
    this._router.navigate(['game/puzzle',newId]); 
    this.savePuzzleSolved();
  }

  ngOnDestroy(){
    this.savePuzzleSolved();
  }

}
