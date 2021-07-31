import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opening } from '../models/opening';

@Injectable({
  providedIn: 'root'
})
export class OpeningService {

  private openingsUrl="http://localhost:8080/openings";
  constructor(private httpClient:HttpClient) { }

  public getAllOpenings():Observable<Opening[]>{
    return this.httpClient.get<Opening[]>(`${this.openingsUrl}`);
  }

  public getOpeningById(id: number): Observable<Opening>{
    return this.httpClient.get<Opening>(`${this.openingsUrl}/${id}`);
  }

  public addOpening(opening:Opening): Observable<Object>{
    return this.httpClient.post(this.openingsUrl,opening);
  }
}
