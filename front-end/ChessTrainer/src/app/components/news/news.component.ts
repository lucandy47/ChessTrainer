import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private _articlesService:ArticleService) { }
  articles:Article[]=[];

  ngOnInit(): void {
    this._articlesService.getNews().subscribe(
      (data)=>{
        this.articles=data.slice(0,5);
        console.log(data);
      },
      (error)=>{
        console.log(error.message);
      }
    )
  }

}
