import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServerdataService } from '../../serverdata.service';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { SMSdata, SmsService } from '../../_services/sms.service';
import { EmailDate, EmailService } from '../../_services/email.service';

@Component({
  selector: 'app-paymentresponse',
  templateUrl: './paymentresponse.component.html',
  styleUrls: ['./paymentresponse.component.css']
})
export class PaymentresponseComponent implements OnInit {
  paymentresponseId: any = '';
  paymentResponseData = {
    id: ''
    , order_id: ''
    , amount : ''
    , order_type: 0
    , tid: ''
    , res_bank_ref_no: ''
    , res_order_status: ''
    , res_mer_amount: ''
    , res_payment_mode: ''
    , created_date: ''
    , modified_date: ''
    ,contact_person_mobileno:''
  };
  public SessionCustomerId: number = 0;
  public spinnerFlag: boolean = false;
  banners: any[];
  constructor(
    private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private service: ServerdataService,
    private smsService: SmsService
    ,private emailService: EmailService
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(routeParams => {
      this.SessionCustomerId = Number(localStorage.getItem('customerid'));
      this.paymentresponseId = String(this.activatedRoute.snapshot.params.responseid);
      //console.log(this.paymentresponseId);
      // this.changeDisplayCount();
      this.getPaymentResponseData();
    });
  }
  async getPaymentResponseData() {
    this.spinnerFlag = true;
    // this.SessionCustomerId = 0;
    //console.log(this.SessionCustomerId);
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'get_payment_reponsedata/' + this.paymentresponseId + '/' + this.SessionCustomerId, { data : '' }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        console.log(data);
        this.paymentResponseData = data;
        this.paymentResponseData.order_type = Number(data.order_type);
        if(this.paymentResponseData.res_order_status == "Success"){
          let smsparams :SMSdata = {
            "SenderId": "ESITRA",
            "Is_Unicode": false,
            "Is_Flash": false,
            "Message": "Payment of Rs. "+this.paymentResponseData.amount+" received towards "+this.paymentResponseData.order_id+" dt "+this.paymentResponseData.order_type+" - SITRA.",
            "MobileNumbers": "91"+this.paymentResponseData.contact_person_mobileno,
            "ApiKey": "sistmsra",
            "ClientId": "sitra"
        }
    
          this.smsService.sendSMS(smsparams).subscribe((res)=>{
            console.log('SMS response',res);
          });
          let email:EmailDate = {
            toemail:"kavilgovindan@gmail.com",
            message:"Payment of Rs. "+this.paymentResponseData.amount+" received towards "+this.paymentResponseData.order_id+" dt "+this.paymentResponseData.order_type+" - SITRA.",
            subject:"SITRA -Payment Confirmation"
          };
          this.emailService.sendEmail(email).subscribe( res =>{
            console.log('Email response',res);
          });
        }
        //console.log(this.paymentResponseData);
        this.spinnerFlag = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  downloadReceipt() {
    alert('Receipt Downloaded');
  }
  gotoCountSearch() {
    this.router.navigateByUrl('ukg');
  }
  async downloadCountDetails() {
    this.spinnerFlag = true;
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'generate_count_converstions/' + this.paymentResponseData.id, { data : '' }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        const res = data;
        if (data.status === true) {
          window.open(environment.documentsUrl + 'converstions/' + this.paymentResponseData.tid + '.pdf');
        }
        this.spinnerFlag = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  async downloadPaymentReceiptDetails() {
    this.spinnerFlag = true;
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'download_payment_transcation/' + this.paymentResponseData.id, { data : '' }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        const res = data;
        if (data.status === true) {
          this.spinnerFlag = false;
          window.open(environment.documentsUrl + 'payment_transcations/' + this.paymentResponseData.tid + '.pdf');
        }
        this.spinnerFlag = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
