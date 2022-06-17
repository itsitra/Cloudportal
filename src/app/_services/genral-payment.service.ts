import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenralPaymentService {
  private apiUrl = environment.apiUrl
  constructor(private httpclient: HttpClient) { }

  payment(params:genralPaymentParams): Observable<any> {
    return this.httpclient.post(this.apiUrl + 'insert_general_payment_transcations', params)
  }

  getBankCharges(): Observable<any>{
    return this.httpclient.get(this.apiUrl+"get_bank_charges");
  }
}

export interface genralPaymentParams {
  data: {
    formdata: {
      amountToPay: string,
      paymentAgainst: string,
      paymentType: string,
      paymentComments: string
    },
    customerid: number,
    orderdetails: {
      amount: string,
      receipt: string
    }
  }
}