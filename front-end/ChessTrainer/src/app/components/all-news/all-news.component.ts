import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../models/article';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  constructor(private _articlesService:ArticleService) { }
  articles:Article[]=[];

  ngOnInit(): void {
    this._articlesService.getNews().subscribe(
      (data)=>{
        this.articles=data;
        console.log(data);
      },
      (error)=>{
        console.log(error.message);
      }
    )
  }

}
