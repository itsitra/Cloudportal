import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ukg',
  templateUrl: './ukg.component.html',
  styleUrls: ['./ukg.component.css']
})
export class UkgComponent implements OnInit {
  public varietyNameList: VarietyLists[];
  public transcationHistory: UkgTrasncations[];
  public paidCountLists: any;
  public varietyNames: any;
  public errorFlag: boolean = false;
  SessionCustomerId: number = 0;
  encryptedCustomerId: any = '';
  ukgFormData = {
    count : '10'
    , variety : 'K'
  };
  sitraUkgFactors = {
    speed: ''
    , tm: ''
    , tpi: ''
    , ukgfactor: ''
  };
  enteredCount: any;
  selectedVariety: any = '';
  spinnerSitraStd: boolean = false;
  constructor(
    private http: HttpClient
    , private router: Router
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
  }
  ngOnInit(): void {
    if (this.SessionCustomerId > 0) {
      console.log('if');
      // this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('login');
      console.log('else');
    }
    // tslint:disable-next-line:max-line-length
    this.encryptedCustomerId = encodeURIComponent(window.btoa(String('http://lab.sitraonline.org/index.php/customerid/' + this.SessionCustomerId + '/1/1.00')));
    // console.log('Type : ' + typeof(this.SessionCustomerId));
    this.loadVarietyDropdownValues();
    this.getVarietyNameList();
    this.loadPaidCountList();
    this.getPreviousTranscationForDataTable();
    // console.log(this.SessionCustomerId);
  }
  loadVarietyDropdownValues() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_ukg_varieties/' + this.SessionCustomerId + '/1', { data: '' }).subscribe({
        next: data => {
          this.varietyNameList = data;
          if (this.varietyNameList.length === 0) {
            this.ukgFormData.variety = '';
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  getVarietyNameList() {
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_ukg_variety_list', { data: '' }).subscribe({
        next: data => {
          this.varietyNames = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  loadPaidCountList() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_paid_count_lists/' + this.SessionCustomerId + '/1', { data: '' }).subscribe({
        next: data => {
          this.paidCountLists = data;
          if (this.paidCountLists.length === 0) {
            this.ukgFormData.count = '';
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  getPreviousTranscationForDataTable() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_previous_transcations/1/' + this.SessionCustomerId, { data: '' }).subscribe({
        next: data => {
          // this.varietyNameList = data;
          this.transcationHistory = data;
          console.log(this.transcationHistory);
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  getSitraStandardUkgData() {
    this.spinnerSitraStd = true;
    let responseData: any;
    // console.log(this.selectedVariety);
    // console.log(this.enteredCount);
    // tslint:disable-next-line:max-line-length
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_sitra_ukg_factors/' + this.SessionCustomerId, { data: this.ukgFormData }).subscribe({
        next: data => {
          responseData = data;
          console.log('--------------------RESULT DATA------------------------');
          this.sitraUkgFactors.speed = responseData.speed;
          this.sitraUkgFactors.tm = responseData.tm;
          this.sitraUkgFactors.tpi = responseData.tpi;
          this.sitraUkgFactors.ukgfactor = responseData.ukgfactor;
          this.getPreviousTranscationForDataTable();
          this.spinnerSitraStd = false;
          this.errorFlag = false;
          if (this.sitraUkgFactors.speed === undefined) {
            console.log('if');
            this.errorFlag = true;
          } else {
            this.errorFlag = false;
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  payloadToPaymentGateway() {
    this.http.post<any>('http://192.168.1.7:82/hdfcpg/index.php', { data: '' }).subscribe({
        next: data => {
          this.varietyNameList = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  resetFormData() {
    this.ukgFormData.count = '';
    this.ukgFormData.variety = '';
    this.sitraUkgFactors.speed = '';
    this.sitraUkgFactors.tm = '';
    this.sitraUkgFactors.tpi = '';
    this.sitraUkgFactors.ukgfactor = '';
    this.errorFlag = false;
  }

}
export interface VarietyLists {
  id: string;
  varietyname: string;
}
export interface UkgTrasncations {
  sno: number;
  count: number;
  variety: string;
  speed: any;
  tm: any;
  tpi: any;
  ukgfactor: any;
}
