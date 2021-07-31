import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/game/services/puzzle.service';
import { Puzzle } from 'src/app/game/models/puzzle';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
declare var ChessBoard: any;
const Chess = require('chess.js');

@Component({
  selector: 'app-puzzle-options',
  templateUrl: './puzzle-options.component.html',
  styleUrls: ['./puzzle-options.component.css']
})
export class PuzzleOptionsComponent implements OnInit {

  puzzles: Puzzle[] = [];
  option!: string;
  boards: any[] = [];

  constructor(private _puzzleService: PuzzleService, private _messenger: MessengerService, private _router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('current-puzzle')) {
      localStorage.setItem('current-puzzle', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('current-puzzle')
    } //functie pentru reload a paginii la incarcarea unei noi probleme
    this.option = "mate_in_2";
    this.getPuzzles(this.option);

  }

  switchOptionMateIn2() {
    this.boards = [];
    this.option = "mate_in_2";
    console.log(this.option);
    this.getPuzzles(this.option);
    console.log(this.boards);
  }

  switchOptionMateIn3() {
    this.boards = [];
    this.option = "mate_in_3";
    console.log(this.option);
    this.getPuzzles(this.option);
  }
  switchOptionMateIn4() {
    this.boards = [];
    this.option = "mate_in_4";
    console.log(this.option);
    this.getPuzzles(this.option);
  }
  switchOptionPositionsAdvantage() {
    this.boards = [];
    this.option = "win_sacrifice";
    console.log(this.option);
    this.getPuzzles(this.option);
  }
  getPuzzles(type: string) {
    this.puzzles = [];
    this._puzzleService.getTypeOfPuzzle(type).subscribe(data => {
      this.puzzles = data;
      this.puzzles.forEach(
        (puzzle) => {
          this.boards.push(this.createBoard(puzzle));
        })
    })
  }

  createBoard(puzzle: Puzzle) {
    var board = null;
    setTimeout(function () {
      board = ChessBoard(puzzle.id.toString(), {
        position: puzzle.fen,
        draggable: false,
        showNotation: false
      });
    }, 0);
    return board;
  }

  viewPuzzle(id: number) {

    this._router.navigate(['game/puzzle', id]);

  }

}
