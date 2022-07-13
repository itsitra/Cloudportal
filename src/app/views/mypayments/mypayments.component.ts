import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from './../../../environments/environment';
import { ServerdataService } from '../../serverdata.service';
import { AESEncryptDecryptServiceService } from '../../aesencrypt-decrypt-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { bankCharges } from '../package-test/package-test.component';
import { GenralPaymentService } from '../../_services/genral-payment.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-mypayments',
  templateUrl: './mypayments.component.html',
  styleUrls: ['./mypayments.component.css']
})
export class MypaymentsComponent implements OnInit {

  @Input() isPublication: boolean = false;

  public SessionCustomerId: number = 0;
  public myPayments: MyPayments[];
  public testRates: TestRates[];
  public loaderFlag: boolean = false;
  public tableHeading = 'Tests Rates';
  public searchText: string = '';
  public apiParams = {
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
  public uploadfile: any = [];
  fileToUpload: File | null = null;
  imageSrc: string;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  options = {
    "key": "rzp_test_Ge8t7vZfoHjNU5", // Enter the Key ID generated from the Dashboard
    "amount": "1000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "SITRA",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    },
    "prefill": {
      "name": "Parthasarathi",
      "email": "itsupport@sitra.org.in",
      "contact": "9487521330"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  options1 = {
    "key": "rzp_test_Ge8t7vZfoHjNU5", // Enter the Key ID generated from the Dashboard
    "amount": "10", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "SITRA",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "http://localhost:82/cloudportalapi/index.php/pg_response_page",
    "prefill": {
      "name": "SITRA Customer",
      "email": "itsupport@sitra.org.in",
      "contact": "9965773730"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#127B6E"
    }
  };
  public newPaymentFormData = {
    amountToPay: 0.00
    , paymentAgainst: ''
    , paymentType: ''
    , paymentComments: ''
  }
  public paymentTypeList: PaymentTypeList[] = [];
  public popupLoaderState: boolean = false;
  Amount: any;
  modalRef: BsModalRef;
  paymentMode: number;
  bankCharges: bankCharges;
  constructor(
    private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private service: ServerdataService
    , private _AESEncryptDecryptService: AESEncryptDecryptServiceService
    ,private modalService :BsModalService
    ,private genralPaymentService:GenralPaymentService
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
  }

  ngOnInit(): void {
    // const routeParams = this.activeRoute.snapshot.params;
    if (this.SessionCustomerId <= 0) {
      this.router.navigateByUrl('login');
    }
    this.activatedRoute.params.subscribe(routeParams => {
      this.apiParams.paymenttype = Number(this.activatedRoute.snapshot.params.type);
      // this.changeDisplayCount();
      //alert(this.apiParams.paymenttype);
      this.resetDataValues();

      let encryptedText = this._AESEncryptDecryptService.encrypt("1");
      console.log('Encript ' + encryptedText);
      let decryptedText = this._AESEncryptDecryptService.decrypt(encryptedText);
      console.log('Decript ' + decryptedText);
    });
    this.loadPaymentTypeList();
    this.getbankcharges();
  }
  //async handleFileInput(files: FileList){
  async handleFileInput(event) {
    //console.log(files);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }
    console.log(this.myForm.value);
    // this.fileToUpload = files.item(0);   
    // const formData: FormData = new FormData();
    // formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
    // console.log(this.fileToUpload);
    // await this.http.post(environment.apiUrl + 'fileupload/', { data : this.fileToUpload }).subscribe({
    //   next: data => {
    //      console.log(data);
    //   },
    //   error: error => {
    //     console.log(error);
    //   }
    // });  

    // await this.http.post<any>(environment.apiUrl + 'fileupload/', { data : formData }).subscribe({
    //   next: data => {

    //   },
    //   error: error => {
    //     console.log(error);
    //   }
    // });  
  }
  async getData() {
    // console.log(this.deptid);
    this.apiParams.searchedText = this.searchText;
    this.apiParams.tablerowstart = this.pagenationConfiguration.currentPageNo;
    this.loaderFlag = true;
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'get_mypayments/' + this.SessionCustomerId, { data: this.apiParams }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        this.myPayments = data.data;
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
  async downloadCountDetails(paymentid, tid) {
    this.spinnerFlag = true;
    console.log(tid);
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'generate_count_converstions/' + paymentid, { data: '' }).subscribe({
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
  async downloadInvoice(paymentid, tid) {
    this.spinnerFlag = true;
    console.log(tid);
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'generate_invoice/' + paymentid, { data: '' }).subscribe({
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
  async checkPaymentStatus() {
    await this.http.post<any>('http://localhost:82/statusapi/index.php/', {}).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  rzp1;
  openPaymentGateway() {
    alert('test');
    this.rzp1 = new this.service.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  };
  public payWithRazor() {
    const options: any = {
      key: 'rzp_test_Ge8t7vZfoHjNU5',
      amount: 1000, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'SITRA', // company name or product name
      description: '',  // product description
      image: './assets/img/brand/sitralogo.jpg', // company logo or product image
      order_id: "order_HREsW3zbYOxqsy", // order_id created by you in backend
      callback_url: "http://localhost:82/cloudportalapi/index.php/api/pg_response_page",
      // callback_url: "http://localhost:4200/#/mypayments/0/",
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },

      prefill: {
        name: 'azorpay',
        email: 'itsupport@sitra.org.in',
        contact: '++919965773730',
        'card[number]': '4012001037141112',
        'card[expiry]': '1222',
        'card[cvv]': '123'
      },
      theme: {
        color: "#127B6E"
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      console.log(response);
      //  console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });


    const rzp = new this.service.nativeWindow.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  }
  async loadPaymentTypeList() {
    await this.http.post<any>(environment.apiUrl + 'get_payment_type_list/', { data: '' }).subscribe({
      next: data => {
        this.paymentTypeList = data;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  doPaymentProcess(amount) {
    this.popupLoaderState = true;
    let orderParams = {
      // amount: this.newPaymentFormData.amountToPay
      amount: amount
      , receipt: localStorage.getItem('customername')
    }

    let params = {
      formdata: this.newPaymentFormData
      , customerid: this.SessionCustomerId
      , orderdetails: orderParams
    }
    this.http.post<any>(environment.apiUrl + 'insert_general_payment_transcations/', { data: params }).subscribe({
      next: data => {
        this.popupLoaderState = false;
        if (data.temp_payment_reference != '') {
          window.location.href = environment.razorpaymentUrl + 'pay.php?order_id=' + data.payload.order_id.toString();
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  paymentOptionOpen(template:TemplateRef<any>,netamount,paymentAgainst,paymentType){
    if(netamount > 0 &&paymentAgainst!=''&&paymentType!=''){
    this.Amount = netamount;
    // this.modalService.hide(primaryModal);
    // this.quatatioNO = quotation;
    this.modalRef = this.modalService.show(template,{ class: 'modal-success' });
    }else{
      Swal.fire("WARNING", "Please enter valid Amount to Pay and Payment Against and Payment Type","warning")
    }
  }

  paymentTypeSelection(amountToPay){
    // console.log(this.paymentMode);
    if(this.paymentMode == 1){
      amountToPay = Number(amountToPay)+Number(amountToPay)*Number(this.bankCharges.credit_card)/100;
    }else if(this.paymentMode == 2){
      amountToPay = Number(amountToPay)+Number(amountToPay)*Number(this.bankCharges.debit_rupay)/100;
    }else if(this.paymentMode == 3){
      amountToPay = Number(amountToPay)+Number(amountToPay)*Number(this.bankCharges.debit_lt_2000)/100;
    }else if(this.paymentMode == 4){
      amountToPay = Number(amountToPay)+Number(amountToPay)*Number(this.bankCharges.debit_gt_2000)/100;
    }else if(this.paymentMode == 5){
      amountToPay = Number(amountToPay)+Number(amountToPay)*Number(this.bankCharges.upi)/100;
    }else if(this.paymentMode == 6){
      amountToPay = Number(amountToPay)+Number(amountToPay)*Number(this.bankCharges.nb)/100;
    }
    this.doPaymentProcess(String(amountToPay));
  }

  getbankcharges(){
    this.genralPaymentService.getBankCharges().subscribe((res)=>{
      this.bankCharges = res[0];
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
export interface MyPayments {
  id: any;
  transactiondate: any;
  orderid: any;
  bankrefno: any;
  amount: any;
  status: any;
  paymentmode: any;
  tid: any;
  order_type: any;
}
export interface PaymentTypeList {
  id: Number;
  type: String;
}