import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
  private url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  Insertparticpants(participants): Observable<any> {
    return this.httpClient.post(this.url + "webinar_participants_insert", participants);
  }
  InsertneftPayment(data): Observable<any> {
    return this.httpClient.post(this.url + "neftPayment", data);
  }
  getParticipants(params:fetchesWebinar): Observable<any> {
    return this.httpClient.post(this.url + 'fetches_webinar_participants', params)
  }
  removeUser(params:{
    custid:string,
    cloud_webinar_id: string,
    email:string
  }): Observable<any> {
    return this.httpClient.put(this.url + 'webinar_participants_delete', params)
  }

}

export interface fetchesWebinar {
  custid: string,
  cloud_webinar_id: string

}
