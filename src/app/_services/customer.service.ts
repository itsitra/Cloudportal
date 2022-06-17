import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }
  
  getCustomerType(params:customerTypeParams):Observable<any>{
   return this.httpClient.post(this.url+'get_customer_type',params);
  }
}

export interface customerTypeParams{
  custid:number
}
