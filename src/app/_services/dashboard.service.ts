import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = environment.apiUrl;

  public partnerURL = "http://122.185.104.198:8075/apex/sitlive/PARTNER_DOC/PARTNER_DOC/SIT/";

  constructor(private httpClient:HttpClient) { }

  getpaymentdetails(customerId):Observable<any>{
    return this.httpClient.get(this.partnerURL+String(customerId));
  }

  getCreditLimit(customerId):Observable<any>{
    return this.httpClient.post(this.url+'fetch_cust_credit_limit',customerId);
  }
}
