import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private Url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  sendEmail(emailParams:EmailDate):Observable<any>{
    return this.httpClient.post(this.Url+'sendmail',emailParams);
  }
}

export interface EmailDate {
  toemail:string, 
  subject:string, 
  message:string
}