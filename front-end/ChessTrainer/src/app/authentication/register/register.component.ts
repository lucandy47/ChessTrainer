import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user=new User();
  errorMessage='';
  constructor(private service :AuthenticationService,private route: Router) { }

  ngOnInit(): void {
  }
  registerUser(){
    this.service.registerUserFromService(this.user).subscribe(
      data=>{
        
        console.log("inregistrare cu succes");
        this.route.navigate(['']);
      },
      error=>{
        console.log("A aparut o eroare");

        this.errorMessage=error.error;
      }
    )
  }

}
