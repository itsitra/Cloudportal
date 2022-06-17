import { Component, OnInit } from '@angular/core';
import { ServerdataService } from './../../serverdata.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phytestrate',
  templateUrl: './phytestrate.component.html',
  styleUrls: ['./testrate.component.css']
})
export class PhytestrateComponent implements OnInit {
    public testRates: TestRates[];
  constructor(
    private serverdata: ServerdataService
    , private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  async getData() {
    // console.log(this.serverdata.getServerData('get_ukg_varieties', ''));
    await this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_testing_charges/8', { data: '' }).subscribe({
      next: data => {
        console.log('--------------------DATA START-----------------');
        console.log(data);
        this.testRates = data;
        console.log('--------------------DATA END-----------------');
      },
      error: error => {
        console.log(error);
      }
    });
    console.log('--------------------SERVICE END-----------------');
  }

}
export interface TestRates {
  labname: string;
  testname: string;
  alias: any;
  standard: any;
  samplesize: any;
  memrate: any;
  nonmemrate: any;
}
