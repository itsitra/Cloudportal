import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { GenralPaymentService } from '../../_services/genral-payment.service';
import { genratePackagetest, insertpackage, packageDetailsParams, packageListParams, PackageTestService } from '../../_services/package-test.service';
import { ProformaService } from '../../_services/proforma.service';
import { SMSdata, SmsService } from '../../_services/sms.service';

@Component({
  selector: 'app-package-test',
  templateUrl: './package-test.component.html',
  styleUrls: ['./package-test.component.css']
})
export class PackageTestComponent implements OnInit {
  packageList: any=[];
  customerId: number;
  searchText: string;
  modalRef: BsModalRef;
  packageMaster: any;
  packageDetailsParams: packageDetailsParams;
  packageDetails: any;
  requestParams: genratePackagetest;
  packid: string = "";
  // noofsamples: string
  insertPackagsparams: {
    custid: number,
    PackId: number,
    noofsamples: number,
    SampDesc: string
  };
  newPaymentFormData: { amountToPay: string; paymentAgainst: string; paymentType: string; paymentComments: string; };

  sampleDescList = [];
  UpdateSampleDesc = [{
    sampleno: "",
    sampleid: "",
    description: "",
    countcode: "",
    remarks: ""
  }];
  sampleTypeData: any;
  sampleData: any;
  sampleDescCreate: sampledesc[] = [{ sampledesc: '' }];
  PaginatedList: any[];
  Amount: any;
  paymentMode: any;
  bankCharges: bankCharges;
  requestNo: any;
  constructor(private packageservice: PackageTestService
    , private datepipe: DatePipe
    , private modalService: BsModalService
    , private genralPaymentService: GenralPaymentService
    , private proformaService: ProformaService
    ,private smsService:SmsService) {
    this.customerId = Number(localStorage.getItem('customerid'));
  }
  listparams: packageListParams;
  noOfSamples: number = 1;
  itemperpage: number = 10;
  packageTestitemperpage: string = "10";

  ngOnInit(): void {
    this.getPackageList();
    this.getPackageMaster();
    this.getbankcharges();
  }

  getPackageList() {
    this.listparams = {
      custid: this.customerId,
      searchedtext: this.searchText,
      tablerowlimit: '',
      tablerowstart: ''
    }
    this.packageservice.getList(this.listparams).subscribe((res) => {
      this.packageList = res;
      this.PaginatedList = this.packageList.slice(0, 10);
    })
  }

  getPackageMaster() {
    this.packageservice.getpackageMaster().subscribe((res) => {
      this.packageMaster = res;
    })
  }

  AddNewPackages(AddPackages: TemplateRef<any>) {
    this.modalRef = this.modalService.show(AddPackages, { class: 'modal-lg modal-success' });
  }

  getPackageDetails(packageDetails: TemplateRef<any>, packageid: number) {
    this.packageDetailsParams = {
      PackId: packageid
    }
    this.packageservice.getPackageDetails(this.packageDetailsParams).subscribe((result) => {
      this.packageDetails = result;
      this.modalRef = this.modalService.show(packageDetails, { class: 'modal-xl modal-success' });

    })
    // this.modalRef = this.modalService.show(packageDetails, { class: 'modal-lg modal-success' });

  }

  genrateRequest(rNo) {
    this.requestParams = {
      RNo: rNo
    };
    this.packageservice.genratePackageTestRequest(this.requestParams).subscribe((res) => {
      let result = res;
      if (result == false) {
        Swal.fire("ERROR", "Something went wrong", 'error');
        return
      }
      // let smsparams :SMSdata = {
      //   ApiKey:"sistmsra",
      //   ClientId:"sitra",
      //   Is_Flash:false,
      //   Is_Unicode:false,
      //   Message:'Payment of Rs. 10000 received towards TESTVAR dt TESTVAR - SITRA.',
      //   MobileNumbers:'919751931707',
      //   SenderId:"ESITRA",        
      // };

      // this.smsService.sendSMS(smsparams).subscribe((res)=>{
      //   console.log(res);
      // })
      this.getPackageList();
      Swal.fire("SUCCESS", "Successfully genrated test Request", 'success');
      
    })
  }

  insertPackage() {
    let sampledescription = "";
    this.sampleDescCreate.map(ele => { sampledescription = ele.sampledesc + ',' + sampledescription })
    this.insertPackagsparams = {
      PackId: Number(this.packid),
      custid: this.customerId,
      noofsamples: Number(this.noOfSamples),
      SampDesc: sampledescription
    }
    this.packageservice.insertpackage(this.insertPackagsparams).subscribe(res => {
      let result = res.status;
      if (result) {
        Swal.fire("SUCCESS", "Package Inserted Successfully ", 'success');
        this.modalRef.hide();
        this.getPackageList();
      } else {
        Swal.fire("ERROR", "Something went wrong", 'error');
      }
      // console.log(result);
    })
  }
  packageTestPayNow(totalAmount: string,request) {
    if(Number(totalAmount) == 0){
      Swal.fire('WARNING','place slecet value greater than Zero','warning');
      return ;
    }

    this.newPaymentFormData = {
      amountToPay: totalAmount,
      paymentAgainst: "2",
      paymentType: "25",
      paymentComments: request
    }

    // this.popupLoaderState = true;
    let orderParams = {
      amount: this.newPaymentFormData.amountToPay
      , receipt: localStorage.getItem('customername')
    }

    let params = {
      data: {
        formdata: this.newPaymentFormData
        , customerid: this.customerId
        , orderdetails: orderParams
      }
    }
    this.genralPaymentService.payment(params).subscribe(
      data => {
        if (data.temp_payment_reference != '') {
          window.location.href = environment.razorpaymentUrl + 'pay.php?order_id=' + data.payload.order_id.toString();
        }
      },
      error => {
        console.log(error);
      });

  }

  sampleChange(event) {
    if (Number(event) > 11) {
      Swal.fire("ERROR", "Something went wrong", 'error');
      // event.preven
      return false;
    }
    this.sampleDescList = [];
    for (let index = 0; index < event; index++) {
      this.sampleDescList.push({ itemno: index + 1, sampledesc: "" })
    }

    console.log(this.sampleDescList);
  }

  getSampleData(SampleDescription: TemplateRef<any>, quotationNo, labId) {
    let sampleRequest = {
      RNo: quotationNo
    };

    let sampleType = {
      labid: labId
    };
    this.proformaService.getSampleTypeData(JSON.stringify(sampleType)).subscribe((res) => {
      this.sampleTypeData = res;
    });

    this.proformaService.getsamplerequest(JSON.stringify(sampleRequest)).subscribe((res) => {
      this.sampleData = res;
      this.UpdateSampleDesc = this.sampleData.map(value => {
        return {
          sampleno: value.sampleno,
          sampleid: "",
          description: "",
          countcode: "",
          remarks: ""
        }
      });
      this.modalRef = this.modalService.show(SampleDescription, { class: 'modal-xl modal-success' });
    });
  }

  Updatesampledescription() {
    console.log(this.UpdateSampleDesc)
    //   let postvalue = {}
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

  decreseSample() {
    if (this.noOfSamples == 0) {
      return;
    }
    this.noOfSamples = this.noOfSamples - 1;
    this.sampleDescCreate.pop()
  }

  increseSamples() {
    this.noOfSamples = this.noOfSamples + 1;
    this.sampleDescCreate.push({ sampledesc: '' });
  }
  
  PackageTestPageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    // this.returnedArray = this.contentArray.slice(startItem, endItem);
    this.PaginatedList = this.packageList.slice(startItem, endItem);
  }

  itemChange() {
    this.itemperpage = Number(this.packageTestitemperpage);
    this.PackageTestPageChanged({itemsPerPage:this.itemperpage,page:1})
    // this.PackageTestPageChanged();
  }
  
  getbankcharges(){
    this.genralPaymentService.getBankCharges().subscribe((res)=>{
      this.bankCharges = res[0];
    })
  }

  openPaymentOption(template:TemplateRef<any>,netamount,request){
    this.Amount = netamount;
    this.requestNo = request;
    // this.genralPaymentService.getBankCharges().subscribe((res)=>{
    //   this.bankCharges = res[0];
    // })
    this.modalRef = this.modalService.show(template,{ class: 'modal-success' });
  }

  paymentTypeSelection(amountToPay,request){
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
    this.packageTestPayNow(String(amountToPay),request);
  }
}

export interface sampledesc {
  sampledesc: string
}
export interface bankCharges{
  Id: string,
  credit_card: string,
  debit_gt_2000: string,
  debit_lt_2000: string,
  debit_rupay: string,
  nb: string,
  upi: string
}