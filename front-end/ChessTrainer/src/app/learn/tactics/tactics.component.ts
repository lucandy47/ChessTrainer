import { Component, OnInit } from '@angular/core';
import { Puzzle } from 'src/app/game/models/puzzle';
import { PuzzleService } from 'src/app/game/services/puzzle.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';

declare var ChessBoard:any;
const Chess = require('chess.js');

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.component.html',
  styleUrls: ['./tactics.component.css']
})
export class TacticsComponent implements OnInit {

  constructor(private _puzzleService:PuzzleService,private _messenger: MessengerService,private _router: Router) { }

  puzzles:Puzzle[]=[];
  option!:string;
  boards: any[] = [];

  ngOnInit(): void {
    if (!localStorage.getItem('current-puzzle')) { 
      localStorage.setItem('current-puzzle', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('current-puzzle') 
    } //functie pentru reincarcarea a paginii la incarcarea unei noi probleme
    this.option="dbl_att";
      this.getPuzzles(this.option);
  }

  switchOptionDoubleAttack(){
    this.boards=[];
    this.option="dbl_att";
    console.log(this.option);
    this.getPuzzles(this.option);
    console.log(this.boards);
  }

  switchOptionDiscoveryAttack(){
    this.boards=[];
    this.option="disc_att";
    console.log(this.option);
    this.getPuzzles(this.option);
  }
  switchOptionPin(){
    this.boards=[];
    this.option="pin";
    console.log(this.option);
    this.getPuzzles(this.option);
  }
  switchOptionOverloading(){
    this.boards=[];
    this.option="overloading";
    console.log(this.option);
    this.getPuzzles(this.option);
  }

  getPuzzles(type:string){
    this.puzzles=[];
      this._puzzleService.getTypeOfPuzzle(type).subscribe(data=>{
        this.puzzles=data;
        this.puzzles.forEach(
          (puzzle)=>{
            this.boards.push(this.createBoard(puzzle));
          })})
  }

  createBoard(puzzle:Puzzle){
    var board=null;
    setTimeout(function() {
      board=ChessBoard(puzzle.id.toString(),{
        position:puzzle.fen,
        draggable:false,
        showNotation: false
        }); 
  }, 0);
    return board;
}

viewPuzzle(id:number){
  this._router.navigate(['game/puzzle',id]); 
}

}
