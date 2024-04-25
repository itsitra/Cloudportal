import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { ServerdataService } from '../../serverdata.service';
import { AESEncryptDecryptServiceService } from '../../aesencrypt-decrypt-service.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-oe',
  templateUrl: './oe.component.html',
  styleUrls: ['./oe.component.css']
})
export class OeComponent implements OnInit {
  ukgFormData = {
    count : ''
    , variety : ''
    , speed: '5000'
    , tm: '2.85'
    , paytype: '1'
  };
  public varietyNameList: VarietyLists[];
  spinnerSitraStd: boolean = false;
  public errorFlag: boolean = false;
  public transcationHistory: UkgTrasncations[] = [];
  public varietyNames: any;
  public paymentType: number = 1;
  public noofSelectedCount: number = 0;
  public totalAmountToPay: number = 0.00;
  public errorMessage: any = '';
  public encryptedCustomerId: any = '';
  public SessionCustomerId: number = 0;
  public RazorpayOrderDetails : any = [];
  public countPriceForPayment : Number = 0.00;
  constructor(
    private http: HttpClient
    , private router: Router
    , private service : ServerdataService
    , private _AESEncryptDecryptService: AESEncryptDecryptServiceService
    
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
    console.log('------ UKG Payment Constructor-------------');

    let encryptedText = this._AESEncryptDecryptService.encrypt("1");
    console.log('Encript ' + encryptedText);
    let decryptedText = this._AESEncryptDecryptService.decrypt(encryptedText);
    console.log('Decript ' + decryptedText);
  }

  ngOnInit(): void {
    if (this.SessionCustomerId <= 0) {
      this.router.navigateByUrl('login');
    }
    this.loadVarietyDropdownValues();
    this.getVarietyNameList();
    this.setCountPrice();
  }
  loadVarietyDropdownValues() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>(environment.apiUrl + 'get_ukg_varieties_oe/', { data: '' }).subscribe({
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
  }
  getVarietyNameList() {
    this.http.post<any>(environment.apiUrl + 'get_ukg_variety_list_oe', { data: '' }).subscribe({
        next: data => {
          this.varietyNames = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  addNewRecord() {
    /*
    this.http.post<any>('http://192.168.1.7:82/cloudwallet/index.php/api/get_', { data: '' }).subscribe({
        next: data => {
          this.varietyNames = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
    */
   // console.log(this.ukgFormData);
   const selectedCount = this.ukgFormData.count;
   const selectedVarity = this.ukgFormData.variety;
   const selectedPaymentType = this.ukgFormData.paytype;
   const selectedSpeed = this.ukgFormData.speed;
   let isCountPresent ;
   let isVarityPresent;
   let isPaymentTypePresent;
   let isSpeedPresent;
   /*
   const isCountPresent = this.transcationHistory.some(function(el) {
      return el.count === String(selectedCount);
    });
    const isVarityPresent = this.transcationHistory.some(function(el) {
      return el.variety === String(selectedVarity);
    });
    const isPaymentTypePresent = this.transcationHistory.some(function(el) {
      return el.type === Number(selectedPaymentType);
    });
    */
    if (selectedPaymentType === '1') {
      this.ukgFormData.speed = '';
      this.ukgFormData.tm = '';
    }
    const filtered = this.transcationHistory.filter(function(element) {
      // Create an array using `.split()` method
      // let cats = element.category.split(' ');
      // if (element.count === this.ukgFormData.count) {
      console.log(element);
      const  counts = element.count.split(' ');
      const varities = element.variety.split(' ');
      const paytypes = element.paytype.split(' ');
      const speeds = element.speed.split(' ');
      console.log(speeds);
      counts.filter(function(cat) {
        // return filtersArray.indexOf(cat) > -1;
        console.log('second filter ' + cat);
        if (Number(cat) === Number(selectedCount)) {
          isCountPresent = true;
          console.log(' Count Already Exist ' + cat);
        }
      });
      varities.filter(function(varity) {
        // return filtersArray.indexOf(cat) > -1;
        console.log('second filter varity ' + varity);
        if (String(varity) === String(selectedVarity)) {
          isVarityPresent = true;
          console.log(' Varity Already Exist ' + varity);
        }
      });
      paytypes.filter(function(paytype) {
        // return filtersArray.indexOf(cat) > -1;
        console.log('second filter Paytype ' + paytype);
        if (String(paytype) === String(selectedPaymentType)) {
          isPaymentTypePresent = true;
          console.log(' Paytype Already Exist ' + paytype);
        }
      });
      speeds.filter(function(spd) {
        // return filtersArray.indexOf(cat) > -1;
        console.log('second filter speed ' + spd);
        if (String(spd) === String(selectedSpeed)) {
          isSpeedPresent = true;
          console.log(' Speed Already Exist ' + spd);
        }
      });
      // }
      // Filter the returned array based on specified filters
      // If the length of the returned filtered array is equal to
      // length of the filters array the element should be returned
   });
   // if (  (isCountPresent === false || isVarityPresent === false ) || isPaymentTypePresent === false) {
     if (isCountPresent === true && isVarityPresent === true && isPaymentTypePresent === true && isSpeedPresent === true) {
      // do something
      this.errorMessage = 'Alredy this count and varity added.! Please select different count or varity';
     } else {
      console.log('Count present ' + isCountPresent);
      console.log('Varity present ' + isVarityPresent);
      this.transcationHistory.push(
          { count: this.ukgFormData.count
            , speed: this.ukgFormData.speed
            , tm: this.ukgFormData.tm
            , variety: this.ukgFormData.variety
            , paytype: this.ukgFormData.paytype
          }
        );
        this.noofSelectedCount += 1;
        this.totalAmountToPay += Number(this.countPriceForPayment);
        this.errorMessage = '';
      }
  // } else {
      // this.errorMessage = 'Alredy this count and varity added.! Please select different count or varity';
   // }
  }
  addNewRecord1() {
    let mandatoryValidation = '';
    let countValidation = false;
    if (this.ukgFormData.paytype === '1') {
      this.ukgFormData.speed = '';
      this.ukgFormData.tm = '';
      if (this.ukgFormData.count !== '' && this.ukgFormData.variety !== '') {
        //
      } else {
        mandatoryValidation = '1';
      }
    } else if (this.ukgFormData.paytype === '2') {
      if (this.ukgFormData.count !== '' && this.ukgFormData.variety !== '' && this.ukgFormData.speed !== '' && this.ukgFormData.tm !== '') {
        //
      } else {
        mandatoryValidation = '1';
      }
    }
    if (Number(this.ukgFormData.count) >= 10 && Number(this.ukgFormData.count) <= 120) {
      countValidation = true;
    }
    if (mandatoryValidation === '' && countValidation === true) {
      if (this.transcationHistory.length === 0) { // for first row
        this.transcationHistory.push(
          { count: this.ukgFormData.count
            , speed: this.ukgFormData.speed
            , tm: this.ukgFormData.tm
            , variety: this.ukgFormData.variety
            , paytype: this.ukgFormData.paytype
          }
        );
        this.noofSelectedCount += 1;
        // this.totalAmountToPay += 50.00;
        this.totalAmountToPay += Number(this.countPriceForPayment);
        this.errorMessage = '';
        // tslint:disable-next-line:max-line-length
        this.encryptedCustomerId = encodeURIComponent(window.btoa(String('http://lab.sitraonline.org/index.php/customerid/' + this.SessionCustomerId + '/1/' + this.totalAmountToPay)));
      } else { // validate existing data
        console.log(this.transcationHistory);
        let dataExisting = 0;
        for (let i = 0; i < this.transcationHistory.length; i++) {
          let countExist = 0;
          let varityExist = 0;
          let paytype = 0;
          let spd = 0;
          let tm = 0;
          if ( Number(this.transcationHistory[i].count) === Number(this.ukgFormData.count)) {
            countExist = 1;
          }
          if ( String(this.transcationHistory[i].variety) === String(this.ukgFormData.variety)) {
            varityExist = 1;
          }
          if ( String(this.transcationHistory[i].paytype) === String(this.ukgFormData.paytype)) {
            paytype = 1;
          }
          if ( String(this.transcationHistory[i].speed) === String(this.ukgFormData.speed)) {
            spd = 1;
          }
          if ( String(this.transcationHistory[i].tm) === String(this.ukgFormData.tm)) {
            tm = 1;
          }
          if (this.ukgFormData.paytype === '1') {
            if ( countExist === 1 && varityExist === 1 && paytype === 1) {
              dataExisting = 1;
              break;
            }
          } else if (this.ukgFormData.paytype === '2') {
            if ( countExist === 1 && varityExist === 1 && paytype === 1 && spd === 1 && tm === 1) {
              dataExisting = 1;
              break;
            }
          }

        }
        if (dataExisting !== 1) {
          this.transcationHistory.push(
            { count: this.ukgFormData.count
              , speed: this.ukgFormData.speed
              , tm: this.ukgFormData.tm
              , variety: this.ukgFormData.variety
              , paytype: this.ukgFormData.paytype
            }
          );
          this.noofSelectedCount += 1;
          this.totalAmountToPay += Number(this.countPriceForPayment);
          this.errorMessage = '';
          // tslint:disable-next-line:max-line-length
          this.encryptedCustomerId = encodeURIComponent(window.btoa(String('http://lab.sitraonline.org/index.php/customerid/' + this.SessionCustomerId + '/1/' + this.totalAmountToPay)));
        } else {
          this.errorMessage = 'Alredy this count details added.! Please select different count details';
        }
        console.log(dataExisting);
      }
    } else {
      if (countValidation === false) {
        this.errorMessage = 'Count should between 10 to 120';
      } else if (mandatoryValidation !== '') {
        this.errorMessage = 'Please fill the mandatory field(s)';
      }
    }
  }
  removeDataRow(index) {
    const confirmFlag = confirm('Do you want to remove this count ?');
    if (confirmFlag === true) {
      // console.log(this.transcationHistory);
     // const index: number = this.transcationHistory.indexOf(ukg);
      if (index !== -1) {
          this.transcationHistory.splice(index, 1);
          this.noofSelectedCount -= 1;
          this.totalAmountToPay -= Number(this.countPriceForPayment);
          // tslint:disable-next-line:max-line-length
          this.encryptedCustomerId = encodeURIComponent(window.btoa(String('http://lab.sitraonline.org/index.php/customerid/' + this.SessionCustomerId + '/1/' + this.totalAmountToPay)));
      }
    }
  }
  doPayNow() {
    if (Number(this.noofSelectedCount) > 0 && Number(this.totalAmountToPay) > 0 ) {
      this.errorMessage = 'Payment gateway connecting...Please wait a moment.,';
      // console.log('Payment gateway connecting...');
      // tslint:disable-next-line:max-line-length
      let paymentType = 1; // for UKG Payment = 1;
      let orderParams = {
        amount:this.totalAmountToPay
        , receipt: localStorage.getItem('customername')
      }
      let params = {
          transcation : this.transcationHistory
          , orderdetails : orderParams
      }
      this.http.post<any>(environment.apiUrl + 'insert_ukg_factors_transcations/' + this.SessionCustomerId +'/' +paymentType, { data: params }).subscribe({
        next: data => {
          console.log(data);
          if(data.temp_payment_reference !=''){
            setTimeout(() => {
              //this.payWithRazor(data.payload);
              // window.location.href = environment.razorpaymentUrl + data.payload.order_id.toString()
              window.location.href = environment.razorpaymentUrl + 'pay.php?order_id=' + data.payload.order_id.toString();
            }, 100);
          }
          //const paymentref = Number(data.temp_payment_reference);
          //if (paymentref > 0) {
            //this.payWithRazor(paymentref);
            // tslint:disable-next-line:max-line-length
            //this.encryptedCustomerId = encodeURIComponent(window.btoa(String('http://lab.sitraonline.org/index.php/customerid/' + this.SessionCustomerId + '/1/' + this.totalAmountToPay + '/' + paymentref)));
            //window.location.href = environment.pgUrl + '?customerid=' + this.encryptedCustomerId;
          //}
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
  // get nativeWindow():any{
  //   return _window();
  // }
  async generateRazorpayNewOrderId(){
    let params = {
      'amount' : 100
      , 'currency':'INR'
      , 'receipt': 'testo'
      , 'payment_capture' :  1
    }
    await this.http.post<any>('http://www.sitraonline.org.in/paymentgateway/index.php/api/get_razorpay_new_order_id', { data: params}).subscribe({
        next: data => {
          this.RazorpayOrderDetails = data;
          console.log(this.RazorpayOrderDetails);
          if(this.RazorpayOrderDetails.id){
            this.doPayNow();
          }else{
            alert("Payment gateway Order Id not generated. Please Try again.");
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  generateRazorpayNewOrderId1(){
    this.http.post<any>('http://192.168.1.19:8081/createorder?amount=5000&receipt=Mr.Parthasarathi', { data: ''}).subscribe({
        next: data => {
          alert(data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }

  public payWithRazor1(payload) {
    alert(payload.order_id);
  }
  async payWithRazor(payload) {
//    console.log(payload);
    const options: any = {
      key: 'rzp_test_Ge8t7vZfoHjNU5',
      amount:  Number(payload.amount), // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'SITRA', // company name or product name
      description: '',  // product description
      image: './assets/img/brand/sitralogo.jpg', // company logo or product image
      order_id: payload.order_id.toString(), // order_id created by you in backend
      callback_url: environment.apiUrl+"pg_response_page",
     // callback_url: "http://localhost:4200/#/mypayments/0/",
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      prefill:{

      },
      // prefill: {
      //   name: 'azorpay',
      //   email: 'itsupport@sitra.org.in',
      //   contact: '++919965773730',
      //   'card[number]': '4012001037141112',
      //   'card[expiry]': '1222',
      //   'card[cvv]': '123'
      // },
      theme: {
          color: "#127B6E"
      }
    };
    options.handler = ((response:any, error:any) => {
      options.response = response;
      console.log(response);
    //  console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
  
    
    // const rzp = new this.service.nativeWindow.Razorpay(options);
    const rzp = await new this.service.nativeWindow.Razorpay(options);
    //const rzp = new this.window.Razorpay(options);
    
    console.log('service window start here')
    console.log(postMessage)
    
    rzp.open();
    
    
    rzp.on('payment.failed', function (response:any){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
  }
  validateCountRate() {
    if (Number(this.ukgFormData.count) >= 10 && Number(this.ukgFormData.count) <= 120) {
      // allow to next
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Count should Numeric value / It should between in 10 to 120';
      this.ukgFormData.count = '';
    }
  }
  validateSpindleSpeed() {
    if (Number(this.ukgFormData.speed) >= 5000 && Number(this.ukgFormData.speed) <= 25000) {
      // allow to next
      this.errorMessage = '';
    } else {
       this.errorMessage = 'Spindle speed should Numeric value / It should between in 5000 to 25000';
       this.ukgFormData.speed = '';
    }
  }
  validateTm() {
    if (Number(this.ukgFormData.tm) >= 2 && Number(this.ukgFormData.tm) <= 10) {
      // allow to next
      this.errorMessage = '';
    } else {
       this.errorMessage = 'TM should Numeric value / It should between in 2 to 10';
       this.ukgFormData.tm = '';
    }
  }
  async setCountPrice(){
      await this.http.post<any>(environment.apiUrl + 'get_count_price_for_onlinepayment/' + this.SessionCustomerId , { data: '' }).subscribe({
        next: data => {
          this.countPriceForPayment = Number(data);
          //console.log('count price ' + data);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
}
export interface VarietyLists {
  id: string;
  varietyname: string;
}
export interface UkgTrasncations {
  count: any;
  variety: string;
  speed: any;
  tm: any;
  paytype: any;
}
