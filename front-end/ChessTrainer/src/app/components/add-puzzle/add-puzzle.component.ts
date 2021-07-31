import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleService } from 'src/app/game/services/puzzle.service';
import { Puzzle } from 'src/app/game/models/puzzle';

@Component({
  selector: 'app-add-puzzle',
  templateUrl: './add-puzzle.component.html',
  styleUrls: ['./add-puzzle.component.css']
})
export class AddPuzzleComponent implements OnInit {

  constructor(private _route: Router,private _puzzleService:PuzzleService) { }

  puzzle:Puzzle=new Puzzle();
  message!:string;

  ngOnInit(): void {
  }

  addPuzzle(){
    this._puzzleService.addPuzzle(this.puzzle).subscribe(
      (data)=>{
        this.message = "Puzzle added succesfully !";
      },
      (error)=>{
          this.message=error.error;
      }
    )
  }

}
