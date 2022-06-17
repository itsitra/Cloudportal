import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2';
import { Checkoutparams, publicationSelected } from './publicationslist.component';
import { CustomerService, customerTypeParams } from '../../_services/customer.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PublicationService } from '../../_services/publication.service';
import { GenralPaymentService } from '../../_services/genral-payment.service';
import { bankCharges } from '../package-test/package-test.component';

@Component({
  selector: 'app-publications',
  templateUrl: './publicationsfocuslist.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsfocuslistComponent implements OnInit {
  public SessionCustomerId: number = 0;
  public publicationFocusLists: PublicationFocusList[];
  public loaderFlag: boolean = false;
  public tableHeading = 'Publication Focus List';
  public deptid: number = 0;
  public deptidd: any;
  public searchText: string = '';
  public apiParams = {
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
  publicationFocusSelected: publicationSelected[] = [];
  newPaymentFormData: { amountToPay: number; paymentAgainst: string; paymentType: string; paymentComments: string; };
  curierCharges: number;
  PINcode: any;
  phoneNumber: any;
  Address: any;
  Name: any;
  checkOut: Checkoutparams;
  IsMember: boolean = false;
  modalref: any;
  paymentMode: number;
  totalvalue: number;
  bankCharges: bankCharges;
  genralPaymentId: string;
  curierWeight: any;
  curierPincode: any;
  // delivery:deliveryDetails;
  constructor(
    private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private customerService: CustomerService
    , private modalService: BsModalService
    , private publicationServices: PublicationService
    , private genralPaymentService: GenralPaymentService
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
  }

  ngOnInit(): void {
    // const routeParams = this.activeRoute.snapshot.params;
    if (this.SessionCustomerId <= 0) {
      this.router.navigateByUrl('login');
    }
    this.activatedRoute.params.subscribe(routeParams => {
      this.deptid = 8; // Number(this.activatedRoute.snapshot.params.deptid);
      // this.changeDisplayCount();
      this.resetDataValues();
    });

    this.getCustomerType();
    this.getbankcharges();
  }
  async getData() {
    // console.log(this.deptid);
    this.apiParams.searchedText = this.searchText;
    this.apiParams.tablerowstart = this.pagenationConfiguration.currentPageNo;
    this.loaderFlag = true;
    // tslint:disable-next-line:max-line-length
    await this.http.post<any>(environment.apiUrl + 'get_publication_focus_list/', { data: this.apiParams }).subscribe({
      next: data => {
        // console.log('--------------------DATA START-----------------');
        this.publicationFocusLists = data.data;
        for (let index = 0; index < this.publicationFocusLists.length; index++) {
          const element = this.publicationFocusLists[index];
          let ExsitingIndex = this.publicationFocusSelected.findIndex(ele => ele.itemcode == element.itemcode);
          if (ExsitingIndex > -1) {
            this.publicationFocusLists[index].cheked = true
          }
        }
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

  PublicationSelection(item, NMamount, Mamount, Title, Weight) {

    let ExsitingIndex = this.publicationFocusSelected.findIndex(ele => ele.itemcode == item);
    if (ExsitingIndex > -1) {
      this.publicationFocusSelected.splice(ExsitingIndex, 1);
      return
    }
    this.publicationFocusSelected.push(
      {
        itemcode: item,
        nmamount: NMamount,
        mamount: Mamount,
        title: Title,
        quantity: "1",
        weight: Weight
      }
    );
  }

  PublicationPayment() {

    if (this.publicationFocusSelected.length == 0) {
      Swal.fire("No publication Focus Selected", " please Select any publication Focus", "info");
      return;
    }

    let totalAmount = 0;
    if (this.IsMember) {
      this.publicationFocusSelected.forEach(ele => totalAmount = totalAmount + Number(ele.mamount) * Number(ele.quantity));
    } else {
      this.publicationFocusSelected.forEach(ele => totalAmount = totalAmount + Number(ele.nmamount) * Number(ele.quantity));
    }
    //courier charges 
    totalAmount = totalAmount + this.curierCharges;
    //patment gateway tax 
    if (this.paymentMode == 1) {
      totalAmount = Number(totalAmount) + Number(totalAmount) * Number(this.bankCharges.credit_card) / 100;
    } else if (this.paymentMode == 2) {
      totalAmount = Number(totalAmount) + Number(totalAmount) * Number(this.bankCharges.debit_rupay) / 100;
    } else if (this.paymentMode == 3) {
      totalAmount = Number(totalAmount) + Number(totalAmount) * Number(this.bankCharges.debit_lt_2000) / 100;
    } else if (this.paymentMode == 4) {
      totalAmount = Number(totalAmount) + Number(totalAmount) * Number(this.bankCharges.debit_gt_2000) / 100;
    } else if (this.paymentMode == 5) {
      totalAmount = Number(totalAmount) + Number(totalAmount) * Number(this.bankCharges.upi) / 100;
    } else if (this.paymentMode == 6) {
      totalAmount = Number(totalAmount) + Number(totalAmount) * Number(this.bankCharges.nb) / 100;
    }
    this.newPaymentFormData = {
      amountToPay: totalAmount,
      paymentAgainst: "",
      paymentType: "5",
      paymentComments: this.genralPaymentId
    }

    // this.popupLoaderState = true;
    let orderParams = {
      amount: totalAmount
      , receipt: localStorage.getItem('customername')
    }

    let params = {
      formdata: this.newPaymentFormData
      , customerid: this.SessionCustomerId
      , orderdetails: orderParams
    }
    this.http.post<any>(environment.apiUrl + 'insert_general_payment_transcations/', { data: params }).subscribe({
      next: data => {
        // this.popupLoaderState = false;
        if (data.temp_payment_reference != '') {
          window.location.href = environment.razorpaymentUrl + 'pay.php?order_id=' + data.payload.order_id.toString();
        } else {
          Swal.fire("ERROR", "no response from API", "error");
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getCourierCharges() {
    this.checkOut = {
      custid: this.SessionCustomerId,
      name: this.Name,
      address: this.Address,
      phoneNO: this.phoneNumber,
      pincode: this.PINcode,
      publications: this.publicationFocusSelected
    }
    this.publicationServices.getCourierCharge(this.checkOut).subscribe((res) => {
      if (res.status) {
        this.curierCharges = Number(res.courier_charges);
        this.curierWeight = res.weight;
        this.curierPincode = res.del_pincode == null ? 'Not Provided' : res.del_pincode;
        this.genralPaymentId = res.paymentid
        // this.PublicationPayment();
      }
    })
    // this.curierCharges = 100;

  }

  getCustomerType() {
    this.customerService.getCustomerType({ custid: this.SessionCustomerId }).subscribe(result => {
      if (result[0].customer_type == "M") {
        this.IsMember = true;
      } else {
        this.IsMember = false;
      }
    }, err => {
      console.log(err);
    })
  }

  showCheckOut(Checkout: TemplateRef<any>) {
    if (this.publicationFocusSelected.length < 1) {
      Swal.fire("No publication Selected", " please Select any publication", "info");
      return
    }
    let params: customerTypeParams = {
      custid: Number(this.SessionCustomerId)
    }
    this.customerService.getCustomerType(params).subscribe(res => {
      let result = res[0];
      this.Name = result.mill_organization_name;
      this.phoneNumber = result.contact_person_mobileno;
      this.PINcode = result.pincode;
      this.Address = (result.address1 == '' || result.address1 == null) ? result.address2 : result.address1;
    })
    this.modalref = this.modalService.show(Checkout, { class: 'modal-xl' });
  }

  paymentOptionOpen(template: TemplateRef<any>) {
    this.modalref.hide();
    this.totalvalue = 0;
    this.customerService.getCustomerType({ custid: this.SessionCustomerId }).subscribe(result => {
      if (result[0].customer_type == "M") {
        this.publicationFocusSelected.forEach(ele => this.totalvalue = this.totalvalue + Number(ele.mamount) * Number(ele.quantity));
      } else {
        this.publicationFocusSelected.forEach(ele => this.totalvalue = this.totalvalue + Number(ele.nmamount) * Number(ele.quantity));
        // this.publicationSelected.forEach(ele => totalAmount=totalAmount+Number(ele.amount));
      }
    });
    this.getCourierCharges();
    this.modalref = this.modalService.show(template, { class: 'modal-success' });
  }

  getbankcharges() {
    this.genralPaymentService.getBankCharges().subscribe((res) => {
      this.bankCharges = res[0];
    })
  }

}
export interface PublicationFocusList {
  cheked: boolean;
  itemcode: string;
  serialno: string;
  title: any;
  volume: any;
  month: any;
  year: any;
  no: any;
  member_rate: any;
  nonmeber_rate: any;
}
// export interface deliveryDetails{
//   Name:string;
//   PhoneNO:string;
//   PINcode:string;
//   Address:string;
// }
