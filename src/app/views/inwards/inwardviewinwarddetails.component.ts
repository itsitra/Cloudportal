import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-inwardviewinwarddetails',
  templateUrl: './inwardviewinwarddetails.component.html',
  styleUrls: ['./inwardview.component.css']
})
export class InwardviewinwarddetailsComponent implements OnInit {  
  public SessionLimsCustomerId : Number = 0;
  public SessionInwardno : any = '';
  public SessionAccessno : any = '';
  public pieChartLabels: string[] = ['Pending', 'In-Progress', 'Completed'];
  public pieChartData: number[] = [0, 0, 0];
  colors =  [
    {
      backgroundColor: [
        '#fc4e4e',
        '#3ec5f2',
        '#0EA563'
      ]
    }
  ];
  public pieChartType = 'pie';
  public inwardDetails = {
    inwardno : ''
    , accesscode : ''
  }
  public inwardPageDetails = {
      inwardno : ''
      , inward_date : ''
      , samplesreturn : ''
      , nablcomment : ''
      , name : ''
      , address1 : ''
      , address2 : ''
      , city : ''
      , state : ''
      , pincode : ''
      , phoneno : ''
      , mobile : ''
      , emailid : ''
      , reqno : ''
      , reqdate : ''
      , receiptno : ''
      , receiptdate : ''
      , comments : ''
      , noofsamples : ''
      , invoiceno : ''
      , testcharges : ''
      , discount : ''
      , subtotal_a : ''
      , other_charge : ''
      , additional_charge : ''
      , taxable_charge : ''
      , cgst : ''
      , sgst : ''
      , igst : ''
      , subtotal_b : ''
      , rounded_off : ''
      , netamt : ''
      , exp_testing : ''
      , custtype: ''
      , sample_received_date: ''
      , is_combo :''
      , test_condition_based : ''
      , refno :''
      , invoicecomment : ''
      , sample_received_condition:'' 
       

  }
  constructor(
    private http : HttpClient
    , private router: Router
    , private activatedRoute : ActivatedRoute
  ) {
    this.SessionInwardno = String(this.activatedRoute.snapshot.params.inwardno);
    this.SessionLimsCustomerId = Number(localStorage.getItem('lims_custid'));
    //this.SessionInwardno = localStorage.getItem('session_inwardno');
    //this.SessionAccessno = localStorage.getItem('session_accessno');
   }

  ngOnInit(): void {
     if(this.SessionInwardno !== ''){
       this.getInwardDetails();
     }else{
     // this.router.navigateByUrl('login');
     }
  }
  // Pie
  
  async getInwardDetails(){
    let params = {
      inwardno : this.SessionInwardno
      , custid : this.SessionLimsCustomerId
    }
    await this.http.post<any>(environment.apiUrl + 'inward_view_details/1', { data: params }).subscribe({
      next: data => {
        this.inwardPageDetails = data.data;
        this.pieChartData = data.data.sample_statistics;
        
      }
    });
  }
}
