import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService {

  constructor(private _router:Router,private _service:AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, url: any){
    if (this._service.isUserLoggedIn()) {
      const userRole = this._service.getLoggedInUser().role;
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this._router.navigate(['']);
        return false;
      }
      return true;
    }

    this._router.navigate(['']);
    console.log("Redirectionat spre prima pagina");
    return false;
  }
}
