import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../components/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient:HttpClient) { }

  private articlesUrl:string="http://localhost:8080/articles"

  public getNews():Observable<Article[]>{
    return this.httpClient.get<Article[]>(this.articlesUrl);
  }
}
