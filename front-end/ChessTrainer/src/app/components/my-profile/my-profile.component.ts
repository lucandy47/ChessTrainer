import { SolvedPuzzle } from './../../game/models/solved-puzzle';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/authentication/model/user';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { PuzzleService } from 'src/app/game/services/puzzle.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user=new User();
  errorMessage='';
  id!: number;
  puzzlesSolved=0;
  status!:string;
  solvedPuzzles:SolvedPuzzle[]=[];
  constructor(private _service:AuthenticationService,private _puzzleSolvedService:PuzzleService) { }

  ngOnInit(): void {
    
    this._puzzleSolvedService.getSolvedPuzzles().subscribe(
      data=>{
        console.log(data);
        this.user=this._service.getLoggedInUser();
        this.id=this.user.id;
        this.solvedPuzzles=data;
          for(let i=0;i<data.length;i++){
            if(data[i].user.id === this._service.getLoggedInUser().id){
              this.puzzlesSolved = this.puzzlesSolved + 1;
            }
          }
          if(this.puzzlesSolved < 3){
            this.status = "Rookie";
          }else if(this.puzzlesSolved >=3 && this.puzzlesSolved < 7){
            this.status = "Medium";
          }else{
            this.status = "Advanced";
          }
      },
      error=>{console.log(error.message)}
    )
  }
  updateUser(){
    this._service.updateUserFromService(this.id,this.user).subscribe(
      data=>{ 
        console.log("Update cu succes"+data);
        sessionStorage.setItem('user',JSON.stringify(data));
      },
      error=>{
        console.log("A aparut o eroare");

        this.errorMessage=error.error;
      }
    )
  }

}
