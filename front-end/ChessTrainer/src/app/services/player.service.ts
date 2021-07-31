import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../components/models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private httpClient:HttpClient) { }

  private playerUrl="http://localhost:8080/players";

  public getPlayers():Observable<Player[]>{
    return this.httpClient.get<Player[]>(this.playerUrl);
  }
}
