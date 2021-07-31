import { ChessEngineService } from './../AI/chess-engine/chess-engine.service';
import { Injectable } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { PassThrough } from 'stream';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private chessEngineService:ChessEngineService){
  }

  private pgn: string = "";
  private status: string = "";
  private puzzle_history:string[]=[];
  private correctMoves:boolean[]=[];

  idxMove = 0;
  notationIdx = 0;
  indexMoveHistory=0;

  public getPgn() {
    return this.pgn;
  }
  public getStatus() {
    return this.status;
  }
  public getPuzzleHistory(){
    return this.puzzle_history;
  }
  public getMovesType(){
    return this.correctMoves;
  }


  public setPgn(newPgn:string){
    this.pgn=newPgn;
  }

  onDragStart(source: any, piece: string, position: any, orientation: any, game: any) {
    if (game.game_over()){
      return false
    } 

    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
    return true;
  }

  onDrop(source: any, target: any, game: any,gameType:string,board:any,player:string,depth:number) {
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })
  
    if (move === null) {
      return 'snapback'
    } else {
      if(gameType=="solo"){
        this.updateStatusAndPgn(game);
      }else if(gameType=="computer"){
        if(game.turn() !== player){
          setTimeout(()=>{this.chessEngineService.makeAImove(game,board,player,depth)},50);
        }
        this.updateStatusAndPgn(game);
      }
      return move; 
    }
  }
  onDropPuzzle(source: any, target: any, game: any, player: string, pgn: string) {
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' 
    })
    if (move === null) {
      return 'snapback'
    } else {
      console.log(this.idxMove)
      this.makePuzzleMove(pgn, game, player, this.idxMove, this.notationIdx);
      this.idxMove = this.idxMove + 2;
      if (game.turn() === 'b' && this.notationIdx == 0) {
        this.notationIdx = this.notationIdx + 2;
      } else {
        this.notationIdx = this.notationIdx + 3;
      }
      this.puzzle_history.push(game.history()[this.indexMoveHistory])
      this.indexMoveHistory=this.indexMoveHistory+2;
      this.pgn=game.pgn();
      return move;
    }
  }

  onSnapEnd(board: any, game: any) {
    board.position(game.fen())
  }

  getSolution(pgn:string){
    const moves = pgn.split(" ");
    var solutionMoves=[];
    let i=1;
      while(i<=moves.length){
        solutionMoves.push(moves[i]);
        i=i+3;
      }
    return solutionMoves;
  }

  makePuzzleMove(pgn: string, game: any, player: string, idxMove: number, notationIdx: number) {

    const moves = pgn.split(" ");
    console.log('Moves '+moves);
    console.log(parseInt(moves[notationIdx].split(".")[0]));
    var moveNumber = idxMove + parseInt(moves[notationIdx].split(".")[0]);
    if (game.turn() !== player) {
      console.log("History " + game.history())
      console.log(game.history()[idxMove] + " " + moves[moveNumber]);
      if (game.history()[idxMove] == moves[moveNumber]) {
        this.correctMoves.push(true);
        if (player == 'b') {
          game.move(moves[moveNumber + 2])
        } else {
          game.move(moves[moveNumber + 1])
        }
      }else{
        this.correctMoves.push(false);
      }
    }
  }


  updateStatusAndPgn(game: any) {
    
    var moveColor = 'White'
    if (game.turn() === 'b') 
    {
      moveColor = 'Black'
    }

    if (game.in_checkmate())
     {
      this.status = 'GAME OVER!\n' + moveColor + ' is in checkmate.'
    }

    else if (game.in_draw() || game.in_threefold_repetition() || game.in_stalemate() || game.insufficient_material())
     {
      this.status = 'GAME OVER!\nYou have drawn!'
    } else
     {
      this.status = moveColor + '\'s move'
      if (game.in_check()) 
      {
        this.status += ', ' + moveColor + ' King is in check!'
      }
    }
    this.pgn = game.pgn();
  }

  
  undoMove(game: any, board: any) {
    game.undo();
    console.log(game.ascii())
    board.position(game.fen());

  }

  restartPosition(game: any, board: any, originalFen: string) {
    board.position(originalFen);
    game.load(originalFen);
    this.puzzle_history=[];
    this.correctMoves=[];
    this.idxMove = 0;
    this.notationIdx = 0;
    this.indexMoveHistory=0;
    this.pgn = "";
  }

  flipBoard(board: any) {
    board.flip();
  }


  getMovesFromAPgn(pgn:string){
    var moves = pgn.split(" ");
    var result=[];
    for(let i=1;i<moves.length;i++){
      if(i % 3 != 0){
        result.push(moves[i]);
      }
    }
    return result;
  }

  

}
