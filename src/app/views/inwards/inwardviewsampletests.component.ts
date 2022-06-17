import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import {Pipe, PipeTransform} from '@angular/core';

@Component({
  selector: 'app-inwardviewsampletests',
  templateUrl: './inwardviewsampletests.component.html',
  styleUrls: ['./inwardview.component.css']
})
@Pipe({name: 'keys'})
export class InwardviewsampletestsComponent implements OnInit {  
  public SessionLimsCustomerId : Number = 0;
  public SessionInwardno : any = '';
  public SessionAccessno : any = '';
  public inwardSampleLists : SampleList[] = [];
  public inwardStandardNarration : any[] = [];
  public inwardDetail = {
    descritiveType : ''
    , descriptiveResult : ''
    , documentRoot : ''
  }
  public inwardSampleTests : any = [];
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
  public pdfUrl : any = '';
  constructor(
    private http : HttpClient
    , private router: Router
    , private activatedRoute : ActivatedRoute
  ) { 
    this.SessionInwardno = String(this.activatedRoute.snapshot.params.inwardno);
    this.SessionLimsCustomerId = Number(localStorage.getItem('lims_custid'));
  }

  ngOnInit(): void {
    
    if(this.SessionInwardno !== ''){
      this.getSamplesTestsAndResults();
    }
    this.pdfUrl = environment.baseUrl+'pdf/';
     
  }
  // Pie
  public pieChartLabels: string[] = ['Pending', 'In-Progress', 'Completed'];
  public pieChartData: number[] = [7, 5, 3];
  public pieChartType = 'pie';
  
  async getSamplesTestsAndResults(){
    let params = {
      inwardno : this.SessionInwardno
      , custid : this.SessionLimsCustomerId
    }
    await this.http.post<any>(environment.apiUrl + 'get_samples_tests_and_results/', { data: params }).subscribe({
      next: data => {
       // data = data.json();
        this.inwardSampleLists = data.samplelist;
        this.inwardDetail.descritiveType =  data.descriptive;
        this.inwardDetail.descriptiveResult =  data.descriptive_result;
        this.inwardDetail.documentRoot = data.document_root
        this.inwardStandardNarration = data.standard_narration;
        // console.log(data);
       }
    });
  }
  downloadPdfFile(){
    alert("Open Download page")
    this.http.get<any>(environment.baseUrl +'pdfs/X123456.pdf', {responseType:"json"}).subscribe(response => this.downLoadFile(response, "application/pdf"));
  }


/**
* Method is use to download file.
* @param data - Array Buffer data
* @param type - type of the document.
*/
downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
export interface SampleList{
  sno : any;
  sampleno : any;
  count : any;
  sampleid : any;
  samplename : any;
  nooftests : any;
  description : any;
  remark : any;
  status: any;
  color : any;
}
export interface TestLists{
  testname : any;
}
