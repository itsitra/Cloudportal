import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageTestService {
  private url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getList(params: packageListParams): Observable<any> {
    return this.httpClient.post(this.url + 'get_package_test_data', params);
  }

  getpackageMaster() {
    return this.httpClient.get(this.url + 'get_package_master_data')
  }

  getPackageDetails(params: packageDetailsParams) {
    return this.httpClient.post(this.url + 'get_package_details', params);
  }

  genratePackageTestRequest(params: genratePackagetest) {
    return this.httpClient.post(this.url + 'create_request_from_package', params);
  }

  insertpackage(params: insertpackage): Observable<any> {
    return this.httpClient.post(this.url + 'insert_package_request', params);
  }
}

export interface packageListParams {
  custid: number,
  searchedtext: string,
  tablerowstart: string,
  tablerowlimit: string

}

export interface packageDetailsParams {
  PackId: number
}

export interface genratePackagetest {
  RNo: string
}

export interface insertpackage {
  custid: number,
  PackId: number,
  noofsamples: number
}