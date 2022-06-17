import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { GenralPaymentService } from '../../../_services/genral-payment.service';
import { ProformaService } from '../../../_services/proforma.service';
import { bankCharges } from '../../package-test/package-test.component';

@Component({
  selector: 'app-proforma-list',
  templateUrl: './proforma-list.component.html',
  styleUrls: ['./proforma-list.component.css']
})
export class ProformaListComponent implements OnInit {

  ProformaList = [];
  searchedtext: any;
  listParam = {
    "custid": 0,
    "searchedtext": "",
    "tablerowstart": "1",
    "tablerowlimit": "10"
  }
  PaginatedList: any[];
  proformaitemperpage: string = "10";
  itemperpage: number = 10;
  customerId: number;
  proformaSearchText: any;

  public newPaymentFormData = {
    amountToPay: ""
    , paymentAgainst: ''
    , paymentType: ''
    , paymentComments: ''
  }
  modalRef: BsModalRef;
  sampleData: any;
  sampleTypeData: any;

  UpdateSampleDesc = [{
    sampleno: "",
    sampleid: "",
    description: "",
    countcode: "",
    remarks: ""
  }];

  paymentMode:any = 2;
  Amount: any;
  bankCharges: bankCharges;
  quatatioNO: any;

  constructor(private proformaService: ProformaService, 
    private datapipe: DatePipe, private modalService: BsModalService, 
    private http: HttpClient, private genralPaymentService:GenralPaymentService) {
    this.customerId = Number(localStorage.getItem('customerid'));
  }

  ngOnInit(): void {

    this.getProformaList();
    this.getbankcharges();

  }
  getProformaList() {
    this.listParam = {
      custid: this.customerId,
      searchedtext: this.proformaSearchText,
      tablerowlimit: "",
      tablerowstart: ''
    }
    this.proformaService.getProformaList(JSON.stringify(this.listParam)).subscribe((res) => {
      console.log(res);
      if (res.data.length !== 0) {
        this.ProformaList = res.data;
        this.PaginatedList = this.ProformaList.slice(0, 10);
        //this.datapipe.transform(this.ProformaList.date, "dd/mm/yyyy")
      }
    }, err => {
      console.log(err);
    })
  }
  itemChange() {
    this.itemperpage = Number(this.proformaitemperpage);
  }

  ProformaPageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    // this.returnedArray = this.contentArray.slice(startItem, endItem);
    this.PaginatedList = this.ProformaList.slice(startItem, endItem);
  }

  genrateRequest(quotNo) {
    this.proformaService.genrateRequest(JSON.stringify({ quotationno: quotNo })).subscribe((res) => {
      var result = res;
      if (result.status == true) {
        this.getProformaList();
        Swal.fire("SUCCESS", "Successfully genreted request from quotation", "success");
      } else {
        Swal.fire("ERROR", "something went wrong while genrete request from quotation", "error");
      }
    })
  }

  proformaPayNow(totalAmount:string,quotation) {
    
    this.newPaymentFormData = {
      amountToPay: totalAmount,
      paymentAgainst: "2",
      paymentType: "25",
      paymentComments: quotation
    }

    // this.popupLoaderState = true;
    let orderParams = {
      amount:this.newPaymentFormData.amountToPay
      , receipt: localStorage.getItem('customername')
    }

    let params = {
      formdata : this.newPaymentFormData
      , customerid : this.customerId
      , orderdetails : orderParams
    }
    this.http.post<any>(environment.apiUrl + 'insert_general_payment_transcations/' , { data : params }).subscribe({
      next: data => {
        // this.popupLoaderState = false;
        if(data.temp_payment_reference !=''){
            window.location.href = environment.razorpaymentUrl + 'pay.php?order_id=' + data.payload.order_id.toString();
        }
      },
      error: error => {
        console.log(error);
      }
    });

  }

  getSampleData(SampleDescription: TemplateRef<any>, quotationNo, labId) {
    let sampleRequest = {
      quotationno: quotationNo
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
          sampleid: value.sampleid,
          description: value.description,
          countcode: value.countcode,
          remarks: value.remarks
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

  paymentOptionOpen(template:TemplateRef<any>,netamount,quotation){
    this.Amount = netamount;
    this.quatatioNO = quotation;
    this.modalRef = this.modalService.show(template,{ class: 'modal-success' });
  }

  paymentTypeSelection(amountToPay,quotation){
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
    this.proformaPayNow(String(amountToPay),quotation);
  }

  getbankcharges(){
    this.genralPaymentService.getBankCharges().subscribe((res)=>{
      this.bankCharges = res[0];
    })
  }
}
