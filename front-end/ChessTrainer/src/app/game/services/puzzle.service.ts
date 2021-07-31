import { SolvedPuzzle } from './../models/solved-puzzle';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Puzzle } from '../models/puzzle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private puzzlesUrl="http://localhost:8080/puzzles";
  private solvedPuzzleUrl="http://localhost:8080/solvedPuzzle"
  constructor(private httpClient:HttpClient) { }

  public getAllPuzzles():Observable<Puzzle[]>{
    return this.httpClient.get<Puzzle[]>(`${this.puzzlesUrl}`);
  }

  public getDailyPuzzle():Observable<Puzzle>{
    return this.httpClient.get<Puzzle>(`${this.puzzlesUrl}/dailyPuzzle`);
  }
  public getTypeOfPuzzle(type:string):Observable<Puzzle[]>{
    return this.httpClient.get<Puzzle[]>(`${this.puzzlesUrl}/category/${type}`);
  }
  public getPuzzleById(id: number): Observable<Puzzle>{
    return this.httpClient.get<Puzzle>(`${this.puzzlesUrl}/${id}`);
  }

  public addPuzzle(puzzle:Puzzle):Observable<Object>{
    return this.httpClient.post(`${this.puzzlesUrl}`,puzzle);
  }

  public getSolvedPuzzles():Observable<SolvedPuzzle[]>{
    return this.httpClient.get<SolvedPuzzle[]>(`${this.solvedPuzzleUrl}`);
  }

  public getSolvedPuzzle(id_user:number,id_puzzle:number):Observable<any>{
    return this.httpClient.get<any>(`${this.solvedPuzzleUrl}/user=${id_user}&puzzle=${id_puzzle}`);
  }

  public addSolvedPuzzle(solvedPuzzle:any):Observable<any>{
    return this.httpClient.post<any>(`${this.solvedPuzzleUrl}/add`,solvedPuzzle);
  }

  public getCountSolvedPuzzleByUser(id:number):Observable<number>{
    return this.httpClient.get<number>(`${this.puzzlesUrl}/count/${id}`)
  }

}
