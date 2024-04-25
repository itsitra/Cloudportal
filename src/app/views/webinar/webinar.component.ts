import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { ServerdataService } from '../../serverdata.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { fetchesWebinar, WebinarService } from '../../_services/webinar.service';
import Swal from 'sweetalert2';
import { GenralPaymentService } from '../../_services/genral-payment.service';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.css']
})
export class WebinarComponent implements OnInit {
  public SessionCustomerId: number = 0;
  public webinarList: WebinarList[];
  public webinars: Webinars[];
  public loaderFlag: boolean = false;
  public tableHeading = 'Tests Rates';
  public searchText: string = '';
  public usertype:any =  localStorage.getItem('customer_type');
  public apiParams = {
    searchedText: ''
    , tablerowstart: 0
    , tablerowlimit: 10
    // , paymenttype: 0
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
  public formData = {
    id: ''
    , title: ''
    , description: ''
    , amount: ''
    , webinar_date: ''
    , venue: ''
    , registration_start: ''
    , registration_end: ''
    , document_url: ''
    ,mrate:''
    , webinar_fromdate:''
    ,webinar_todate :''
  }
  public fieldLoader: Boolean = false;
  public paymentLoader: Boolean = false;
  public errorMessage: any = '';
  modalRef: BsModalRef;
  ParticipantsList =[];
  bankName:string;
  ddUtrNo:string;
  ddDate:string;
  ddAmount:string;
  Amount: any;
  paymentMode: number;
  bankCharges: any;
  constructor(
    private http: HttpClient
    , private router: Router
    , private service: ServerdataService
    , private modalServices: BsModalService
    , private webinarServices: WebinarService
    , private genralPaymentService: GenralPaymentService
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
    // this.ParticipantsList = [
    //   {
    //     cloud_webinar_id: "1",

    //     custid: this.SessionCustomerId,

    //     Participant_Name: "",

    //     Participant_Desig: "",

    //     Participant_Email: "",

    //     Participant_Mobile: ""

    //   }
    // ];
  }

  ngOnInit(): void {
    if (this.SessionCustomerId <= 0) {
      this.router.navigateByUrl('login');
    }
    this.loadWebinarDropdownValues();
    this.resetDataValues();
    this.getbankcharges();
  }
  loadWebinarDropdownValues() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>(environment.apiUrl + 'get_webinar_list/', { data: '' }).subscribe({
      next: data => {
        this.webinarList = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
  loadWebinarDetails() {
    if (Number(this.formData.id) > 0) {
      this.fieldLoader = true;
      // tslint:disable-next-line:max-line-length
      this.http.post<any>(environment.apiUrl + 'get_webinar_details/' + this.formData.id, { data: '' }).subscribe({
        next: data => {
          
          data.registration_start=data.registration_start.slice(0, 11)
          data.registration_end=data.registration_end.slice(0, 11)
          data.webinar_fromdate=data.webinar_fromdate.slice(0, 11)
          data.webinar_todate=data.webinar_todate.slice(0, 11)
          console.log(data);
          this.formData = data;
          console.log(this.formData);
          this.fieldLoader = false;
        },
        error: error => {
          console.error('There was an error!', error);
          this.fieldLoader = false;
        }
      });
    } else {
      alert('Select any one the Webinar !')
      this.resetFormData();
    }
  }
  resetFormData() {
    this.formData.id = '';
    this.formData.title = '';
    this.formData.description = '';
    this.formData.amount = '';
    this.formData.webinar_date = '';
    this.formData.venue = '';
    this.formData.registration_start = '';
    this.formData.registration_end = '';
    this.formData.document_url = '';
    this.formData.mrate = '';
  }
  // ------------------------ Start Grid data and Pagination ---------------------------
  async getData() {
    // console.log(this.deptid);
    this.apiParams.searchedText = this.searchText;
    this.apiParams.tablerowstart = this.pagenationConfiguration.currentPageNo;
    this.loaderFlag = true;
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'get_webinars/' + this.SessionCustomerId, { data: this.apiParams }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        this.webinars = data.data;
        
        this.pageCount = Number(data.pagecount);
        if (this.pageCount <= 5) {
          // console.log('page no validatoin ' + this.pageCount);
          this.endPageNo = this.pageCount;
        } else {
          // scenario - 1
          // if the current page no in  between startpage and end page
          // tslint:disable-next-line:max-line-length
          if (this.pagenationConfiguration.currentPageNo >= this.startPageNo && this.pagenationConfiguration.currentPageNo <= this.endPageNo) {
            // do something
          } else {
            console.log('Current page no ' + this.pagenationConfiguration.currentPageNo);
            console.log('Start page no ' + this.startPageNo);
            console.log('End page no ' + this.endPageNo);
            // this.endPageNo = Number(5);
            // tslint:disable-next-line:max-line-length
            if (this.pagenationConfiguration.currentPageNo !== Number(1) && this.pagenationConfiguration.currentPageNo > this.startPageNo) {
              this.startPageNo = this.startPageNo + Number(1);
              this.endPageNo = this.endPageNo + Number(1);
            } else if (this.pagenationConfiguration.currentPageNo < this.startPageNo) {
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
    for (let j = this.startPageNo; j <= this.endPageNo; j++) {
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
      if (this.pagenationConfiguration.currentPageNo < Number(this.pageCount)) { // validate last page
        // console.log('if');
        // this.pagenationConfiguration.currentPageNo =  Number(this.pagenationConfiguration.currentPageNo) + Number(1);
        // this.getData();
        if (this.pagenationConfiguration.currentPageNo > 5) {
          this.pagenationConfiguration.currentPageNo = Number(this.pagenationConfiguration.currentPageNo) + Number(1);
          this.startPageNo = this.startPageNo + 1;
          this.endPageNo = this.pagenationConfiguration.currentPageNo;
          this.getData();
        } else {
          this.pagenationConfiguration.currentPageNo = Number(this.pagenationConfiguration.currentPageNo) + Number(1);
          this.getData();
        }
      }
    } else if (type === 3) { // do the Previous butting event
      if (this.pagenationConfiguration.currentPageNo !== 1) { // for valiate first page no
        this.pagenationConfiguration.currentPageNo = Number(this.pagenationConfiguration.currentPageNo) - Number(1);
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
  // -------------------------End grid Data and Pagination -----------------------------

  doPayNow(amount) {
    if (Number(this.formData.id) > 0) {
      this.errorMessage = 'Payment gateway connecting...Please wait a moment.,';
      this.paymentLoader = true;
      // tslint:disable-next-line:max-line-length
      let paymentType = 2; // for Webinar Payment
      let orderParams = {
        amount: amount
        , receipt: localStorage.getItem('customername'),
        orderType:'webinar'
      }
      let params = {
        customerid: this.SessionCustomerId
        , webinarid: this.formData.id
        , orderdetails: orderParams
        , ordertype: paymentType
      }
      this.http.post<any>(environment.apiUrl + 'insert_webinar_transcations/', { data: params }).subscribe({
        next: data => {
          //console.log(data);
          if (data.temp_payment_reference != '') {
            setTimeout(() => {
              window.location.href = environment.razorpaymentUrl + 'webinarpay.php?order_id=' + data.payload.order_id.toString()+'&type=webinar';
            }, 100);
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
      // window.location.href = 'http://192.168.1.7:82/hdfcpg/?customerid=' + this.encryptedCustomerId;
      // window.location.href = 'http://www.google.com';
    } else {
      this.errorMessage = 'Atlease add one count to process the payment';
    }
  }

  // OpenAddParticipants(addParticipants: TemplateRef<any>) {
  //   this.getPaeticipants();
  // }

  addrow() {
    this.ParticipantsList.push({
      cloud_webinar_id: this.formData.id,
      custid: this.SessionCustomerId,
      Participant_Name: "",
      Participant_Desig: "",
      Participant_Email: "",
      Participant_Mobile: "",
      saved:'N'
    });
    console.log(this.ParticipantsList)
  }
  removeRow() {
    
    
    if(this.ParticipantsList[this.ParticipantsList.length-1].saved==='N'){
      this.ParticipantsList.pop();
    }else{
      let element:any =this.ParticipantsList[this.ParticipantsList.length-1];
      console.log(element)
      this.http.post<any>(environment.apiUrl + 'webinar_participants_delete/' + `${element.cloud_webinar_id}/${element.custid}/${element.Participant_Email}`, { data: '' }).subscribe({
        next: data => {
          if(data.status){
            this.ParticipantsList.pop();
          }
        },
        error: error => {
          console.error('There was an error!', error);
          this.fieldLoader = false;
        }
      });
    }
    
    
  }

  AddParticipants() {
    this.webinarServices.Insertparticpants(this.ParticipantsList).subscribe(res => {
      let result = res;
      console.log(res)
      if (result.status == true) {
        Swal.fire("Added", "Participants Added Sucessfully", 'success')
        this.ParticipantsList.forEach(element => {
          element.saved='Y'
        });
      }
       else (
       
        Swal.fire('Error', 'Something went wrong', 'error')
        
      )
      // if (result.status==0) {
      //   alert("Remove the Empty Field before confirm")
      //   empty.focus()
      //   return false
      // }
    })
    console.log(this.ParticipantsList);
  }

  getPaeticipants(addParticipants: TemplateRef<any>) {

    this.ParticipantsList = [
      {
        cloud_webinar_id: this.formData.id,
        custid: this.SessionCustomerId,
        Participant_Name: "",
        Participant_Desig: "",
        Participant_Email: "",
        Participant_Mobile: "",
        saved:'N'
      }
    ];

    let params = {
      custid: String(this.SessionCustomerId),
      cloud_webinar_id: this.formData.id,

    }
    this.webinarServices.getParticipants(params).subscribe(res => {
      let result: any[] = res;
      if (result.length > 0) {
        this.ParticipantsList = result.map(ele => {
          return {
            cloud_webinar_id: ele.cloud_webinar_id,
            custid: ele.cloud_customer_id,
            Participant_Name: ele.Participant_Name,
            Participant_Desig: ele.Participant_Desig,
            Participant_Email: ele.Participant_Email,
            Participant_Mobile: ele.Participant_Mobile,
            saved:'Y'
          }
        });
      }
      // if (result.length==0) {
      //   return false
      // }
      
      this.modalRef = this.modalServices.show(addParticipants, { class: 'modal-xl modal-success' })
      console.log(this.ParticipantsList)
    })
  }

  paymentOptionOpen(template: TemplateRef<any>, netamount) {
    if (Number(this.formData.id) > 0) {
      if(this.ParticipantsList.length > 0){
      this.Amount =  Number(netamount)*this.ParticipantsList.length ;
      // this.quatatioNO = quotation;
      this.modalRef = this.modalServices.show(template, { class: 'modal-success' });
      }
      else{
        Swal.fire("Add Participants","please enter participants details","warning");
      }
    } else {
      this.errorMessage = 'Atlease add one count to process the payment';
    }
  }

  paymentTypeSelection(amountToPay) {
    // console.log(this.paymentMode);
    if (this.paymentMode == 1) {
      amountToPay = Number(amountToPay) + Number(amountToPay) * Number(this.bankCharges.credit_card) / 100;
    } else if (this.paymentMode == 2) {
      amountToPay = Number(amountToPay) + Number(amountToPay) * Number(this.bankCharges.debit_rupay) / 100;
    } else if (this.paymentMode == 3) {
      amountToPay = Number(amountToPay) + Number(amountToPay) * Number(this.bankCharges.debit_lt_2000) / 100;
    } else if (this.paymentMode == 4) {
      amountToPay = Number(amountToPay) + Number(amountToPay) * Number(this.bankCharges.debit_gt_2000) / 100;
    } else if (this.paymentMode == 5) {
      amountToPay = Number(amountToPay) + Number(amountToPay) * Number(this.bankCharges.upi) / 100;
    } else if (this.paymentMode == 6) {
      amountToPay = Number(amountToPay) + Number(amountToPay) * Number(this.bankCharges.nb) / 100;
    }
    this.doPayNow(String(amountToPay));
  }
  AddpaymentDetails(){
    if (this.bankName!="" && this.ddAmount!=""&& this.ddDate!="" && this.ddUtrNo!="") {
      
    
    this.webinarServices.InsertneftPayment(JSON.stringify(
      {
        
        custid: this.SessionCustomerId,
        bankName: this.bankName,
        ddUtrNo: this.ddUtrNo,
        ddAmount: this.ddAmount,
        ddDate:this.ddDate,
        orderType:2
       
  }
    )).subscribe(res=>{
      if (res) {
        Swal.fire("Added", "Payment Added Sucessfully", 'success')
      }else{
        Swal.fire('Error', 'Error Saving data', 'error')
      }
    })}else{
      Swal.fire('Error', 'Enter all fields', 'error')

    }
    }


  

  getbankcharges() {
    this.genralPaymentService.getBankCharges().subscribe((res) => {
      this.bankCharges = res[0];
    })
  }
  async downloadPaymentTranscation(paymentid, tid) {
    this.spinnerFlag = true;
    // console.log(tid);
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'download_payment_transcation/' + paymentid, { data: '' }).subscribe({
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
}

export interface WebinarList {
  id: string;
  title: string;
  description: string;
  amount: string;
  webinar_date: string;
  venue: string;
  registration_start: string;
  registration_end: string;
  document_url: string;
  mrate: string;
  webinar_fromdate: string;
  webinar_todate: string;
}

export interface Webinars {
  cloud_webinar_registration_id: any;
  cloud_webinar_id: any;
  title: any;
  description: any;
  amount: any;
  webinar_date: any;
  venue: any;
  registration_start: any;
  registration_end: any;
  document_url: any;
  reg_status: any;
  payment_status: any;
  mrate:any;

}

export interface participants {

  cloud_webinar_id: string,

  custid: string,

  Participant_Name: string,

  Participant_Desig: string,

  Participant_Email: string,

  Participant_Mobile: string

}