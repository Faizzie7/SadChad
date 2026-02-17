import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendConversation(history: { role: string; content: string }[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      messages: history
    });
  }
}