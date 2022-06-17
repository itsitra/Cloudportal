import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

function _window(): any{
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class ServerdataService {
  public SessionCustomerId: number = 0;
  private baseUrl = '';
  banners: any = ['1', '2', '3'];
  constructor(
    private http: HttpClient
    , private router: Router
  ) {
  }
  get nativeWindow():any{
    return _window();
  }

  getCustomerAnalysis(functioname) {
    this.http.get(`${this.baseUrl}/` + functioname).subscribe(
      data => {
        console.log(data);
        /*this.dataStore.todos = data;
        this._todos.next(Object.assign({}, this.dataStore).todos);
        */
      },
      error => console.log('Could not load todos.')
    );
  }
  async getServerData(methodName, params) {
    let responseData: any;
    console.log('--------------------SERVICE CONNECTED-----------------');
    await this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/' + methodName, { data: params }).subscribe({
      next: data => {
        console.log('--------------------DATA START-----------------');
        responseData = data;
        console.log('--------------------DATA END-----------------');
        return responseData;
      },
      error: error => {
        return error;
      }
    });
    console.log('--------------------SERVICE END-----------------');
  }
  getdata(functioname, parms) {
    this.http.get('http://192.168.1.7:82/cloudwallet/index.php/api/' + functioname, { params: parms }).subscribe(data => {
      return data;
    });
    /*
    await this.http.get(`${this.baseUrl}/` + functioname, {data : parms}).subscribe(
      data => {
        console.log(data);
        // this.dataStore.todos = data;
        // this._todos.next(Object.assign({}, this.dataStore).todos);
        //
      },
      error => console.log('Could not load todos.')
    );
    */
  }
  public getNews() {
    // return this.http.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
  }
  getBanners(): Observable<any[]> {
    return this.banners;
  }
}
