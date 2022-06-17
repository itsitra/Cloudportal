import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ukgmill',
  templateUrl: './ukgmill.component.html',
  styleUrls: ['./ukgmill.component.css']
})
export class UkgmillComponent implements OnInit {
  SessionCustomerId: any = localStorage.getItem('customerid');
  spindleSpeedRange: any = 0;
  public paidCountLists: any;
  public paidSpeeds: any;
  public paidTms: any;
  public varietyNames: any;
  public varietyNameList: VarietyLists[];
  public transcationHistory: any = []; // UkgTrasncations[];
  public errorFlag: boolean = false;
  public ukgmillFormData = {
    count : ''
    , variety : ''
    , speed : ''
    , tm : ''
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
  public errorMessage = '';
  constructor(
    private http: HttpClient
    , private router: Router
  ) {}

  ngOnInit(): void {
    if (this.SessionCustomerId === '') {
      this.router.navigateByUrl('login');
    }
    this.loadVarietyDropdownValues();
    this.getVarietyNameList();
    this.getPreviousTranscationForDataTable();
    this.loadPaidCountList();
  }
  loadPaidCountList() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_paid_count_lists/' + this.SessionCustomerId + '/1', { data: '' }).subscribe({
        next: data => {
          this.paidCountLists = data;
          if (this.paidCountLists.length === 0) {
            this.ukgmillFormData.count = '';
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  loadVarietyDropdownValues() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_ukg_varieties/' + this.SessionCustomerId + '/2', { data: '' }).subscribe({
        next: data => {
          this.varietyNameList = data;
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
  getPreviousTranscationForDataTable() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_previous_transcations/2/' + this.SessionCustomerId, { data: '' }).subscribe({
        next: data => {
          // this.varietyNameList = data;
          // this.transcationHistory = data;
          console.log(this.transcationHistory);
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  getMillStandardUkgData() {
    this.spinnerSitraStd = true;
    let responseData: any;
    // tslint:disable-next-line:max-line-length
    if (this.ukgmillFormData.count !== '' && this.ukgmillFormData.variety !== '' && this.ukgmillFormData.speed !== '' && this.ukgmillFormData.tm !== '') {
      this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_ukgmill_factors', { data: this.ukgmillFormData }).subscribe({
          next: data => {
            responseData = data;
            if (this.transcationHistory.length > 0) {
              let dataExisting = 0;
              for (let j = 0; j < this.transcationHistory.length; j++) {
                let isCountPresent = 0;
                let isVarityPresent = 0;
                let isSpeedPresent = 0;
                let isTmPresent = 0;
                console.log('Table count ' + this.transcationHistory[j].count);
                console.log('Form Data count ' + this.ukgmillFormData.count);

                console.log('Table variety ' + this.transcationHistory[j].variety);
                console.log('Form Data variety ' + this.ukgmillFormData.variety);

                console.log('Table speed ' + this.transcationHistory[j].speed);
                console.log('Form Data speed ' + this.ukgmillFormData.speed);


                if (Number(this.transcationHistory[j].count) === Number(this.ukgmillFormData.count)) {
                  isCountPresent = 1;
                }
                if (String(this.transcationHistory[j].variety) === String(this.ukgmillFormData.variety)) {
                  isVarityPresent = 1;
                }
                if (Number(this.transcationHistory[j].speed) === Number(this.ukgmillFormData.speed)) {
                  isSpeedPresent = 1;
                }
                if (Number(this.transcationHistory[j].tm) === Number(this.ukgmillFormData.tm)) {
                  isTmPresent = 1;
                }
                if ( isCountPresent === 1 && isVarityPresent === 1 &&  isSpeedPresent === 1 && isTmPresent === 1) {
                  dataExisting = 1;
                  break;
                }
              }
              if (dataExisting !== 1) {
                this.transcationHistory.push({
                  count: Number(this.ukgmillFormData.count)
                  , variety: String(this.ukgmillFormData.variety)
                  , speed: this.ukgmillFormData.speed
                  , tm: this.ukgmillFormData.tm
                  , tpi: data.tpi
                  , ukgfactor: data.ukgfactor
                });
              } else {
                this.errorMessage = 'Alrady this count details added';
              }
            } else {
              this.transcationHistory.push({
                count: Number(this.ukgmillFormData.count)
                , variety: String(this.ukgmillFormData.variety)
                , speed: this.ukgmillFormData.speed
                , tm: this.ukgmillFormData.tm
                , tpi: data.tpi
                , ukgfactor: data.ukgfactor
              });
            }
            console.log('--------------------RESULT DATA------------------------');
            this.sitraUkgFactors.tpi = responseData.tpi;
            this.sitraUkgFactors.ukgfactor = responseData.ukgfactor;
            this.spinnerSitraStd = false;
            console.log(this.sitraUkgFactors.ukgfactor);
            if (this.sitraUkgFactors.ukgfactor === '-') {
              this.errorFlag = true;
            } else {
              this.errorFlag = false;
            }
          },
          error: error => {
            console.error('There was an error!', error);
          }
      });
    } else {
      this.errorFlag = true;
      this.spinnerSitraStd = false;
      this.errorMessage = 'Please select all mandatory fields';
    }
  }
  resetFormData() {
    this.ukgmillFormData.count = '';
    this.ukgmillFormData.variety = '';
    this.ukgmillFormData.speed = '';
    this.ukgmillFormData.tm = '';

    this.sitraUkgFactors.speed = '';
    this.sitraUkgFactors.tm = '';
    this.sitraUkgFactors.tpi = '';
    this.sitraUkgFactors.ukgfactor = '';
    this.errorFlag = false;
  }
  loadUkgmillSpeedsAndTms() {
    console.log(this.ukgmillFormData);
    if (this.ukgmillFormData.count !== '' || this.ukgmillFormData.variety !== '') {
      // tslint:disable-next-line:max-line-length
      this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/load_ukgmill_speeds_and_tms/' + this.SessionCustomerId, { data: this.ukgmillFormData }).subscribe({
        next: data => {
          if (data.speeds) {
            this.paidSpeeds = data.speeds;
            if (this.paidSpeeds.length > 0) {
              this.ukgmillFormData.speed = this.paidSpeeds[0].speed;
            } else {
              this.ukgmillFormData.speed = '';
            }
          } else {
            this.paidSpeeds = [];
          }
          if (data.tms) {
            this.paidTms = data.tms;
            if (this.paidTms.length > 0) {
              this.ukgmillFormData.tm = this.paidTms[0].tm;
            } else {
              this.ukgmillFormData.tm = '';
            }
          } else {
            this.paidTms = [];
          }


          console.log(this.paidSpeeds);
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });

    }
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
