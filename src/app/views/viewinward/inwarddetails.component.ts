import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-inwarddetails',
  templateUrl: './inwarddetails.component.html',
  styleUrls: ['./viewinward.component.css']
})
export class InwarddetailsComponent implements OnInit {  
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
  }
  constructor(
    private http : HttpClient
    , private router: Router
  ) {
    this.SessionInwardno = localStorage.getItem('session_inwardno');
    this.SessionAccessno = localStorage.getItem('session_accessno');
   }

  ngOnInit(): void {
     if(this.SessionInwardno !== '' && this.SessionAccessno !==''){
       this.getInwardDetails();
     }else{
      this.router.navigateByUrl('login');
     }
  }
  // Pie
  
  async getInwardDetails(){
    let params = {
      inwardno : this.SessionInwardno
      , accesscode : this.SessionAccessno
    }
    await this.http.post<any>(environment.apiUrl + 'validate_inward_details/1', { data: params }).subscribe({
      next: data => {
        this.inwardPageDetails = data.data;
        this.pieChartData = data.data.sample_statistics;
        
      }
    });
  }
}
