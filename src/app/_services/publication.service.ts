import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private Url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getCourierCharge(params):Observable<any>{
    return this.httpClient.post(this.Url+'calculate_courier_charge',params)
  }
}
