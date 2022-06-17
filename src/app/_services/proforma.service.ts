import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProformaService {
  private url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  
  getProformaList(data:any):Observable<any>{
    return this.httpClient.post(this.url+"get_proforma_data",data);
  }

  genrateRequest(data:any):Observable<any>{
    return this.httpClient.post(this.url+'create_request_from_quote',data);
  }

  paymentProcess(postdata):Observable<any>{
    return this.httpClient.post(this.url+ 'insert_general_payment_transcations/',{data:postdata});
  }

  getsamplerequest(postdata):Observable<any>{
    return this.httpClient.post(this.url+'get_request_sample_data',postdata);
  }

  updateSampleDesc(postdata):Observable<any>{
    return this.httpClient.post(this.url+'update_request_sample_data',postdata);
  }

  getSampleTypeData(postdata):Observable<any>{
    return this.httpClient.post(this.url+'get_sample_type_data',postdata);
  }
}
