import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _service:AuthenticationService,private _route:Router) { }

  ngOnInit(): void {
    this._service.logOut();
    this._route.navigate(['']);
  }

}
