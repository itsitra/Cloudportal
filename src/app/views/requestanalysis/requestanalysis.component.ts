import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from './../../../environments/environment';
import { AESEncryptDecryptServiceService } from '../../aesencrypt-decrypt-service.service';
import { DashboardService } from '../../_services/dashboard.service';
import { ProformaService } from '../../_services/proforma.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requestanalysis',
  templateUrl: './requestanalysis.component.html',
  styleUrls: ['./requestanalysis.component.css']
})
export class RequestanalysisComponent implements OnInit {
    public SessionCustomerId: number = 0;
    public SessionLimsCustomerId : number = 0;
    public requestAnalysis: RequestAnalysis[];  
    public testRates: TestRates[];
    public loaderFlag: boolean = false;
    public tableHeading = 'Request Analysis';
    public searchText: string = '';
    public apiParams  = {
        searchedText: ''
        , tablerowstart: 0
        , tablerowlimit: 10
        , paymenttype: 0
    };
    public pageCount: number = 1;
    public pagenationNoofPage: number = 1;
    public pagenationConfiguration = {
      pageNos: []
      , currentPageNo: Number(1)
    };
    public startPageNo: number = 1;
    public endPageNo: number = 5;
    public spinnerFlag: boolean = false;
    IsEligible:boolean = false;
  sampleData: any;
  UpdateSampleDesc: any;
  modalRef: BsModalRef;
  public type:String=''
  sampleTypeData: any;
  constructor(
    private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private _AESEncryptDecryptService: AESEncryptDecryptServiceService
    ,private dashBoardServices:DashboardService
    ,private proformaService:ProformaService
    ,private modalService: BsModalService
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
    this.SessionLimsCustomerId = Number(localStorage.getItem('lims_custid'));
  }

  ngOnInit(): void {
    // const routeParams = this.activeRoute.snapshot.params;
    if (this.SessionCustomerId <= 0) {
      this.router.navigateByUrl('login');
    }
    this.activatedRoute.params.subscribe(routeParams => {
        this.apiParams.paymenttype = Number(this.activatedRoute.snapshot.params.type);
        // this.changeDisplayCount();
        this.resetDataValues();
    });

    this.dashBoardServices.getCreditLimit(JSON.stringify({ custid: this.SessionCustomerId,limsid:this.SessionLimsCustomerId })).subscribe((res)=>{
      let result = res;
      if((result.credtlimit != null && result.credtlimit > 0 )||(result.advance != null &&result.advance>0) ){
        this.IsEligible = true;

      }
     
    })
  }
  async getData() {
    // console.log(this.deptid);
    this.apiParams.searchedText = this.searchText;
    this.apiParams.tablerowstart = this.pagenationConfiguration.currentPageNo;
    this.loaderFlag = true;
    
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'get_requestanalysis/' + this.SessionLimsCustomerId, { data : this.apiParams }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        this.requestAnalysis = data.data;
        
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
  async downloadCountDetails(paymentid, tid) {
    this.spinnerFlag = true;
    console.log(tid);
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'generate_count_converstions/' + paymentid, { data : '' }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        const res = data;
        if (data.status === true) {
          this.spinnerFlag = false;
          window.open(environment.documentsUrl + 'converstions/' + tid + '.pdf');
        }
        this.spinnerFlag = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  async downloadPaymentTranscation(paymentid, tid) {
    this.spinnerFlag = true;
    console.log(tid);
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'download_payment_transcation/' + paymentid, { data : '' }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        const res = data;
        if (data.status === true) {
          this.spinnerFlag = false;
          window.open(environment.documentsUrl + 'payment_transcations/' + tid + '.pdf');
        }
        this.spinnerFlag = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  async downloadInvoice(paymentid, tid) {
    this.spinnerFlag = true;
    console.log(tid);
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'generate_invoice/' + paymentid, { data : '' }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        const res = data;
        if (data.status === true) {
          this.spinnerFlag = false;
          window.open(environment.documentsUrl + 'invoices/' + tid + '.pdf');
        }
        this.spinnerFlag = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  async checkPaymentStatus () {
    await this.http.post<any>('http://localhost:82/statusapi/index.php/', {  }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        console.log(data) ;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  addupdateRequestAnalysis(reqNo){
    // let encryptedText = this._AESEncryptDecryptService.encrypt(String(reqNo));
    // console.log('Encript ' + encryptedText);
    // let decryptedText = this._AESEncryptDecryptService.decrypt(encryptedText);
    // console.log('Decript ' + decryptedText);
/*
    let encryptedText = this._AESEncryptDecryptService.encrypt(String(reqNo));    
    let finalEncryptedText1 = String(encryptedText);
    let finalEncryptedText = finalEncryptedText1.replaceAll('/', '*'); 
    
    let string = ":insertx: :insertx: :inserty: :inserty: :insertz: :insertz:";
    let newstring = encryptedText.replace('/', '*');
    console.log(newstring);
    */
    //var finalEncryptedText = '';
    //console.log('Final ' + finalEncryptedText);
    // let decryptedText = this._AESEncryptDecryptService.decrypt(encryptedText);
    // console.log('Decript ' + decryptedText);
    //this.router.navigateByUrl('requestanalysisaddupdate/'+finalEncryptedText);
    this.router.navigateByUrl('requestanalysisaddupdate/'+reqNo);
  }
  async downloadAnalysisRequest(reqno){
    this.spinnerFlag = true;
    //alert(md5(reqno));
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'download_analysis_request/'+reqno, { data : '' }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        const res = data;
        if (data.status === true) {
          this.spinnerFlag = false;
          window.open(environment.analysisRequestsUrl +data.filename+'.pdf');
        }
        this.spinnerFlag = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  async deleteAnalysisRequest(reqno,quotationno){
    let confirmFlag = confirm("Do you want Delte this Analysis Request " + reqno + " ?");
    
    //alert(md5(reqno));
    if(confirmFlag === true && reqno !=''){
      this.spinnerFlag = true;
      // tslint:disable-next-line:max-line-length
      await this.http.post<any>(environment.apiUrl + 'delete_analysis_request/?reqno='+reqno+'&quotationno='+quotationno, { data : '' }).subscribe({
        next: data => {
          // console.log('--------------------DATA START-----------------');
          const res = data;
          alert(data.message);
          this.spinnerFlag = false;
          if(data.status === true){
            this.getData();
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  getSampleData(SampleDescription: TemplateRef<any>, requsestNo,labId,reqType) {
    let sampleRequest = {
      RNo: requsestNo
    };

    let sampleType = {
      labid: labId
    };
    
    this.proformaService.getSampleTypeData(JSON.stringify(sampleType)).subscribe((res) => {
      this.sampleTypeData = res;
     
    });
    this.type=reqType;
    console.log(this.type)
    this.proformaService.getsamplerequest(JSON.stringify(sampleRequest)).subscribe((res) => {
      this.sampleData = res;
      this.UpdateSampleDesc = this.sampleData.map(value => {
      
        return {
          sampleno: value.sampleno,
          sampleid: value.sampleid,
          description: value.description,
          countcode: value.countcode,
          remarks: value.remarks,
          ply:value.ply,
          blend:value.blend,
        }
      });
      this.modalRef = this.modalService.show(SampleDescription,{class:'modal-xl modal-success'});
    });
  }

  Updatesampledescription() {
    console.log(this.UpdateSampleDesc)
      let postvalue = {}
    this.proformaService.updateSampleDesc(this.UpdateSampleDesc).subscribe((res) => {
      let result = res;
      if (result.status != null || result.status == true) {
        Swal.fire("Success", "Sample description updated sucessfully", "success");
        this.modalRef.hide();
        return;
      }
      Swal.fire("ERROR", "something went wrong", "error");
    })
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
export interface RequestAnalysis {
  reqno: any;
  request_date: any;
  sample_type : string;
  noofsamples : string;
  inwardno: any;
  inwarddate: any;
  status_string: any;
  status: any;
  quotationno:any;
}
