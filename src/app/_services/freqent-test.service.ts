import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FreqentTestService {
  private url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getFrequentTests(data):Observable<any> {
    return this.httpClient.post(this.url+'get_cust_freq_tests',data);
  }

  fetchTestMasterData(data):Observable<any>{
    return this.httpClient.post(this.url+'fetch_test_master_data',data);
  }

  insertCustFreqtests(data):Observable<any>{
    return this.httpClient.post(this.url+'insert_cust_freq_tests',data);
  }

  deleteCustFreqTests(data):Observable<any>{
    return this.httpClient.post(this.url+'delete_cust_freq_tests',data);
  }

}
