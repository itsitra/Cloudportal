import { Component, OnInit } from '@angular/core';
import { ServerdataService } from './../../serverdata.service';

@Component({
  selector: 'app-analysisrequests',
  templateUrl: './analysisrequests.component.html',
  styleUrls: ['./analysisrequests.component.css']
})
export class AnalysisrequestsComponent  {

  constructor(
    private serverdata: ServerdataService
  ) { }
  getServerData() {
    this.serverdata.getCustomerAnalysis('get_customer_analysis');
  }
}
