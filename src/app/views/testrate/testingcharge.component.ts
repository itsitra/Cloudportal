import { Component, OnInit } from '@angular/core';
import { ServerdataService } from './../../serverdata.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-testingcharge',
  templateUrl: './testingcharge.component.html',
  styleUrls: ['./testrate.component.css']
})
export class TestingchargeComponent implements OnInit {
    SessionCustomerId: any = localStorage.getItem('customerid');
    public testRates: TestRates[];
    public loaderFlag: boolean = false;
    public tableHeading = 'Tests Details';
    public deptid: number = 0;
    public deptidd: any;
    public searchText: string = '';
    public apiParams  = {
        searchedText: ''
        , tablerowstart: 0
        , tablerowlimit: 10
    };
    public pageCount: number = 1;
    public pagenationNoofPage: number = 1;
    public pagenationConfiguration = {
      pageNos: []
      , currentPageNo: Number(1)
    };
    public startPageNo: number = 1;
    public endPageNo: number = 5;
  constructor(
    private serverdata: ServerdataService
    , private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private router: Router
  ) {
    /*
    if (this.deptid === 8) {
        this.tableHeading = 'Physics Tests Rates';
    } else if (this.deptid === 9) {
        this.tableHeading = 'Chemical Tests Rates';
    }
    */
  }

  ngOnInit(): void {
    // const routeParams = this.activeRoute.snapshot.params;
    if (this.SessionCustomerId === '') {
       this.router.navigateByUrl('login');
    }
    this.activatedRoute.params.subscribe(routeParams => {
        this.deptid = Number(this.activatedRoute.snapshot.params.deptid);
        // this.changeDisplayCount();
        this.resetDataValues();
    });
  }
  async getData() {
    // console.log(this.deptid);
    this.apiParams.searchedText = this.searchText;
    this.apiParams.tablerowstart = this.pagenationConfiguration.currentPageNo;
    this.loaderFlag = true;
    if (this.deptid === 7) {
        this.tableHeading = 'Knitting / Weaving Testing Details';
    } else if (this.deptid === 8) {
        this.tableHeading = 'Physics Testing Details';
    } else if (this.deptid === 9) {
        this.tableHeading = 'Chemical Testing Details';
    } else if (this.deptid === 10) {
        this.tableHeading = 'Medical Textile Testing Details';
    } else if (this.deptid === 11) {
        this.tableHeading = 'Engineering Testing Details';
    } else {
        this.tableHeading = 'Testing Details';
        // console.log('else');
    }
    // console.log(this.tableHeading);
    // this.loaderFlag = true;
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'get_testing_charges/' + this.deptid, { data : this.apiParams }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        this.testRates = data.data;
        this.pageCount = Number(data.pagecount);
        if (this.pageCount <= 5) {
          // console.log('page no validatoin ' + this.pageCount);
          this.endPageNo = this.pageCount;
        } else {
          // scenario - 1
          // if the current page no in  between startpage and end page
          // tslint:disable-next-line:max-line-length
          if ( this.pagenationConfiguration.currentPageNo >= this.startPageNo && this.pagenationConfiguration.currentPageNo <= this.endPageNo) {
            // do something
          } else {
            console.log('Current page no ' + this.pagenationConfiguration.currentPageNo);
            console.log('Start page no ' + this.startPageNo);
            console.log('End page no ' + this.endPageNo);
            // this.endPageNo = Number(5);
            // tslint:disable-next-line:max-line-length
            if (this.pagenationConfiguration.currentPageNo !== Number(1) && this.pagenationConfiguration.currentPageNo >  this.startPageNo) {
              this.startPageNo = this.startPageNo + Number(1);
              this.endPageNo = this.endPageNo + Number(1);
            } else if (this.pagenationConfiguration.currentPageNo <  this.startPageNo) {
              this.startPageNo = this.startPageNo - Number(1);
              this.endPageNo = this.endPageNo - Number(1);
            }
          }
        }
        // console.log('data count' + data.datacount);
        // console.log('page count' + data.pagecount);
        // console.log('Last Page No' + this.endPageNo);
        // console.log('--------------------DATA END-----------------');
        this.pageNos();
      },
      error: error => {
        console.log(error);
      }
    });
    console.log('--------------------SERVICE END-----------------');
    setTimeout(() => {
        this.loaderFlag = false;
    }, 500);
  }
  pageNos() {
     console.log(' pageNos function : ' + this.endPageNo);
     this.pagenationConfiguration.pageNos = [];
     for ( let j = this.startPageNo; j <= this.endPageNo; j++) {
      this.pagenationConfiguration.pageNos[j] = j;
    }
    // console.log(this.pagenationConfiguration);
  }
  pagenationEvent(type: number, pageno: number) {
    // console.log('page no clicked');
    // console.log(type);
    if (type === 1) { // page no click event
      if (pageno === this.pagenationConfiguration.currentPageNo) {
          // do nothing
      } else {
        this.pagenationConfiguration.currentPageNo = pageno;
        this.getData();
      }
    } else if (type === 2) { // do the Next butting event
      // console.log('next page btn event; End page no ' + this.endPageNo);
      // console.log(' current page no ' + this.pagenationConfiguration.currentPageNo);
      if (this.pagenationConfiguration.currentPageNo < Number(this.pageCount) ) { // validate last page
        // console.log('if');
        // this.pagenationConfiguration.currentPageNo =  Number(this.pagenationConfiguration.currentPageNo) + Number(1);
        // this.getData();
        if (this.pagenationConfiguration.currentPageNo > 5) {
            this.pagenationConfiguration.currentPageNo =  Number(this.pagenationConfiguration.currentPageNo) + Number(1);
            this.startPageNo = this.startPageNo + 1;
            this.endPageNo = this.pagenationConfiguration.currentPageNo;
            this.getData();
        } else {
          this.pagenationConfiguration.currentPageNo =  Number(this.pagenationConfiguration.currentPageNo) + Number(1);
          this.getData();
        }
      }
    } else if (type === 3) { // do the Previous butting event
      if (this.pagenationConfiguration.currentPageNo !== 1) { // for valiate first page no
        this.pagenationConfiguration.currentPageNo =  Number(this.pagenationConfiguration.currentPageNo) - Number(1);
        this.getData();
      }
    }
  }
  changeDisplayCount() {
    this.pagenationConfiguration.pageNos = [];
    this.pagenationConfiguration.currentPageNo = 1;
    this.startPageNo = 1;
    this.endPageNo = 5;
    this.getData();
  }
  resetDataValues() {
    this.pagenationConfiguration.pageNos = [];
    this.pagenationConfiguration.currentPageNo = 1;
    this.startPageNo = 1;
    this.endPageNo = 5;
    this.apiParams.searchedText = '';
    this.apiParams.tablerowlimit = 10;
    this.apiParams.tablerowstart = 0;
    this.getData();
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
