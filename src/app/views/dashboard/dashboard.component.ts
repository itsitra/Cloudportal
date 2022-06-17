import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TestingcustomerdashboardComponent } from './testingcustomerdashboard.component';
import { UserIdleService } from 'angular-user-idle';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../_services/dashboard.service';
// import { timeStamp } from 'console';
// import { TestingcertificatesComponent } from './testingcertificates.component';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public SessionCustomerId: number = 0;

  // lineChart2
  // public lineChart2Data: Array<any> = [
  //   {
  //     data: [30, 20, 1],

  //   }
  // ];
  public lineChart2Data: Array<any> = [];

  public lineChart2Labels: Array<any> = [];

  //public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        /*ticks: {
          display: false,
          min: 1 - 5,
          max: 54 + 5,
        }*/
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';




  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [],
      label: 'No of Count : ',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = [];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  public dashboardPaymentsData = {
    total_amount: 0.00
    , testing_amount: 0.00
    , ukg_amount: 0.00
    , publications: 0.00
    , other_amount: 0.00
    , payment_data_grid: []
  }
  public dashboardCountData = {
    total_count: 0
  }
  public dashboardInwardDetails = {
    inwardno: ''
    , inwardstatus: ''
    , invoiceno: ''
    , inwardstatus_string: ''
    , accessno: ''
  }
  public newUpdate={
    title:'',
    imgaUrl:'',
    link:''
  }
  public loaderFlag: boolean = false;
  public dashboardSitraTestingFacilities = {
    testcount: ''
    , standards: ''
  }
  PaymentDetails: any = [];
  AdvanceAmount: any;
  PendingAmount: any;
  credLimit :any = 0;
  constructor(
    private userIdle: UserIdleService
    , private router: Router
    , private http: HttpClient
    , private dashService: DashboardService
  ) {
    //console.log('-----------------------');
    console.log(this.barChart1Data);
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));


    //this.getDashboarData();
    this.lineChart2Data = [
      { data: [] }
    ]
    this.lineChart2Labels = [];

    // this.barChart1Data = [
    //   {data : [] }
    // ]
    // this.barChart1Labels = [];

    this.http.post<any>(environment.apiUrl + 'get_dashboard_data/' + this.SessionCustomerId, { data: '' }).subscribe({
      next: data => {
        if (data.payments) {
          this.dashboardPaymentsData = data.payments;
          
          // For Line chart
          this.lineChart2Data = [
            { data: data.payments.linechart_data }
          ];
          this.lineChart2Labels = data.payments.linechart_labels;

          // For Bar chart
          // this. barChart1Data['data'] = data.counts.barchart_data;
          this.barChart1Data = [
            { data: data.counts.barchart_data }
          ]
          this.barChart1Labels = data.counts.barchart_labels;
          this.dashboardCountData.total_count = data.counts.total_count_selected;
          this.dashboardInwardDetails.inwardno = data.latest_inward_details.inwardno;
          this.dashboardInwardDetails.inwardstatus = data.latest_inward_details.inwardstatus;
          this.dashboardInwardDetails.invoiceno = data.latest_inward_details.invoiceno;
          this.dashboardInwardDetails.inwardstatus_string = data.latest_inward_details.inwardstatus_string;
          this.dashboardInwardDetails.accessno = data.latest_inward_details.accessno;

          this.dashboardSitraTestingFacilities.testcount = data.sitra_testing_facilities.testcount;
          this.dashboardSitraTestingFacilities.standards = data.sitra_testing_facilities.standards;
          this.newUpdate.title = data.new_news.title;
          this.newUpdate.imgaUrl = data.new_news.imgUrl;
          this.newUpdate.link = data.new_news.link;

          //console.log(this.barChart1Data);
          //console.log(this.barChart1Labels);

        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });

  }

  ngOnInit(): void {
    // console.log(this.lineChart2Data);
    if (this.SessionCustomerId > 0) {
      //
    } else {
      this.router.navigateByUrl('login');
    }
    // get Dashboard data

    // Start watching for user inactivity.
    // console.log('nginit');
    // this.userIdle.startWatching();
    // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe(count => console.log('Start : ' + count));
    // Start watch when time is up.
    //  this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));
    this.getpayment();
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public roundValue(e:any){
    return Math.round(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  getInwardDetail() {
    this.loaderFlag = true;
    let param = {
      inwardno: this.dashboardInwardDetails.inwardno
    }
    this.http.post<any>(environment.apiUrl + 'get_inward_details_byinwardno/' + this.SessionCustomerId, { data: param }).subscribe({
      next: data => {
        if (data.latest_inward_details) {

          this.dashboardInwardDetails.inwardstatus = data.latest_inward_details.inwardstatus;
          this.dashboardInwardDetails.invoiceno = data.latest_inward_details.invoiceno;
          this.dashboardInwardDetails.inwardstatus_string = data.latest_inward_details.inwardstatus_string;

        }
        this.loaderFlag = false;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });

  }
  async gotoInwardViewPage() {
    localStorage.setItem('session_inwardno', this.dashboardInwardDetails.inwardno);
    localStorage.setItem('session_accessno', this.dashboardInwardDetails.accessno);
    this.router.navigateByUrl('viewinwarddetails');
  }

  getpayment() {
    this.dashService.getpaymentdetails(this.SessionCustomerId).subscribe((result) => {
      this.PaymentDetails = result.items;
      if (this.PaymentDetails.length > 0) {
        this.AdvanceAmount = this.PaymentDetails.filter(item => { return item.type == "ADVANCE" });
        this.PendingAmount = this.PaymentDetails.filter(item => { return item.type == "PENDING" })
      }
    })
    this.dashService.getCreditLimit(JSON.stringify({ custid: this.SessionCustomerId })).subscribe((res) => {
      if (res.length > 0) {
        this.credLimit = res[0].credit_limit;
      }
    })
  }

}
