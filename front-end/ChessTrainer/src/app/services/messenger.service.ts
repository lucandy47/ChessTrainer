import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Puzzle } from '../game/models/puzzle';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject();
  constructor() { }

  sendMessage(puzzle: any){
    this.subject.next(puzzle);
  }

  getMessage(){
    return this.subject.asObservable();
  }
}
