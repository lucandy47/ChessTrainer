import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl="http://localhost:8080/users/login";
  private registerUrl="http://localhost:8080/users";

  private getUserFromTokenUrl="http://localhost:8080/users/get";
  constructor(private http:HttpClient) { }

  public loginUserFromService(user:User):Observable<any>{
      return this.http.post<any>(this.loginUrl,user,{responseType: 'text' as 'json' });
  }
  public registerUserFromService(user:User):Observable<any>{
    return this.http.post<any>(this.registerUrl,user);
  }

  public updateUserFromService(id:number,user:User):Observable<any>{
    return this.http.put<any>(`${this.registerUrl}/${id}`,user);
  }
 
    public getToken(): any{
      return localStorage.getItem('token');
    }



    isUserLoggedIn(){
      let user = JSON.parse(localStorage.getItem('user')!);
      return !(user === null)
    }
  
    logOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  
    getLoggedInUser(){
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      return user;
    }
  
    checkAdmin(){
      if(this.isUserLoggedIn()){
        let user = JSON.parse(localStorage.getItem('user')||'{}');
        if(user.role==="admin"){
          return true;
        }
      }
      
      return false;
  }

  public getUser(token:string):Observable<User>{
    return this.http.get<User>(this.getUserFromTokenUrl, {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${JSON.parse(token)}`)
    });
  }
}
