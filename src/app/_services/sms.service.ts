import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  // private smsURL = "https://api.smslane.com/api/v2/SendSMS";

  constructor(private httpClient: HttpClient) { }

  sendSMS(smsparams:SMSdata): Observable<any> {
    return this.httpClient.get("https://api.smslane.com/api/v2/SendSMS?SenderId="+smsparams.SenderId+"&Is_Unicode="+smsparams.Is_Unicode+"&Is_Flash="+smsparams.Is_Flash+"&Message="+smsparams.Message+"&MobileNumbers="+smsparams.MobileNumbers+"&ApiKey="+smsparams.ApiKey+"&ClientId="+smsparams.ClientId);
  }

}

export interface SMSdata {
  SenderId: string,
  Is_Unicode: boolean,
  Is_Flash: boolean,
  Message: string,
  MobileNumbers: string,
  ApiKey: string,
  ClientId: string
}
