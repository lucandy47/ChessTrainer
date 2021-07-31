import { OpeningService } from './../../learn/services/opening.service';
import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/learn/models/opening';

@Component({
  selector: 'app-add-opening',
  templateUrl: './add-opening.component.html',
  styleUrls: ['./add-opening.component.css']
})
export class AddOpeningComponent implements OnInit {

  constructor(private _openingService:OpeningService) { }
  opening:Opening = new Opening();
  message!:string;

  ngOnInit(): void {
  }

  addOpening(){
    this._openingService.addOpening(this.opening).subscribe(
      (data)=>{
        this.message = "Opening added succesfully";
      },
      (error)=>{
        this.message = error.error;
      }
    )
  }

}
