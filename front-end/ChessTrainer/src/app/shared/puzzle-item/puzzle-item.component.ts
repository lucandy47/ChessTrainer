import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from 'src/app/game/models/puzzle';
declare var ChessBoard:any;
@Component({
  selector: 'app-puzzle-item',
  templateUrl: './puzzle-item.component.html',
  styleUrls: ['./puzzle-item.component.css']
})
export class PuzzleItemComponent implements OnInit {

  @Input() puzzle!:Puzzle;
  board:any;
  description!:string;
  constructor() {
    }
  
  ngOnInit(): void {
    this.getType(this.puzzle);
  }
  getType(puzzle:Puzzle){
    if(puzzle.type=="mate_in_2"){
      return this.description="Mate in 2 moves"
    }else if(puzzle.type=="mate_in_3"){
      return this.description="Mate in 3 moves"
    }else if(puzzle.type=="mate_in_4"){
      return this.description="Mate in 4 moves"
    }else if(puzzle.type=="dbl_att"){
      return this.description="Double attack and fork attack"
    }else if(puzzle.type=="disc_att"){
      return this.description="Attack by discovery"
    }else if(puzzle.type=="pin"){
      return this.description="Pinning"
    }else if(puzzle.type=="overloading"){
      return this.description="Pieces overloading"
    }else{
      return this.description="Winning sacrifices"
  }
}

}
