import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuiztableService {

  constructor(private http: HttpClient) { }
  
  getTable() {
    return this.http.get('http://localhost:3000/highscores')
  }
}
