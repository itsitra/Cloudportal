import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from './../../../environments/environment';

// import Stepper from 'bs-stepper';


@Component({
  selector: 'app-addupdaterequestanalysis',
  templateUrl: './addupdaterequestanalysis.component.html',
  styleUrls: ['./requestanalysis.component.css']
})
export class AddupdaterequestanalysisComponent implements OnInit {
    public SessionCustomerId: number = 0;  
    public spinnerFlag: boolean = false;
    public requestNumber: any = '';
    public departmentList: InterfaceDepartmentList[];
    public labList: InterfaceLabList[];
    public testList: InterfaceTestList[];
    public formData = {
        deptid : ''
        , labid: ''
    }
    public testDetails = {
        testname : ''
        , standard: ''
        , nabl : ''
        , samplesize : ''
        , memrate : ''
        , nonmemrate :''
    }
    isLinear = false;
  
    constructor(
    private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private router: Router
    
    // , private stepper: Stepper
    ) {
        this.SessionCustomerId = Number(localStorage.getItem('customerid'));
    }

    ngOnInit(): void {
        // this.stepper = new Stepper(document.querySelector('#stepper1'), {
        //     linear: false,
        //     animation: true
        //   })
        // const routeParams = this.activeRoute.snapshot.params;
        if (this.SessionCustomerId <= 0) {
            this.router.navigateByUrl('login');
        }
        this.activatedRoute.params.subscribe(routeParams => {
            this.requestNumber = Number(this.activatedRoute.snapshot.params.reqno);
        });
        this.loadDepartmentList();
        this.loadLabList();
         
    }
    async loadDepartmentList(){
        await this.http.post<any>(environment.apiUrl + 'get_department_list/' + this.SessionCustomerId, { data : '' }).subscribe({
            next: data => {
                // console.log('--------------------DATA START-----------------');
                this.departmentList = data;
            },
            error: error => {
                console.log(error);
            }
        });
    }
    async loadLabList(){
        if(Number(this.formData.deptid) > 0){
            await this.http.post<any>(environment.apiUrl + 'get_lab_list/' + this.formData.deptid, { data : '' }).subscribe({
                next: data => {
                    // console.log('--------------------DATA START-----------------');
                    this.labList = data;
                },
                error: error => {
                    console.log(error);
                }
            });
        }{
            this.labList = [];
        }
    }
    async loadTestList(){
        if(this.formData.deptid !='' && this.formData.labid !=''){
            await this.http.post<any>(environment.apiUrl + 'get_testing_charges/' + this.formData.deptid +'/'+ this.formData.labid, { data : '' }).subscribe({
                next: data => {
                    // console.log('--------------------DATA START-----------------');
                    this.testList = data.data;
                    //console.log(data.data);
                },
                error: error => {
                    console.log(error);
                }
            });
        }
    }
    async getTestDetails(testid){
        if(this.formData.deptid !='' && this.formData.labid !='' && testid !=''){
            await this.http.post<any>(environment.apiUrl + 'get_testing_charges/' + this.formData.deptid +'/'+ this.formData.labid +'/'+testid, { data : '' }).subscribe({
                next: data => {
                    // console.log('--------------------DATA START-----------------');
                    //console.log(data.data[0]);
                    if(data.data[0]){
                        alert('if')
                        this.testDetails = data.data[0];
                        console.log(this.testDetails);
                    }else{
                        alert('else')
                    }
                },
                error: error => {
                    console.log(error);
                }
            });
        }
    }
    // next() {
    //     this.stepper.next();
    //   }
    
    //   onSubmit() {
    //     return false;
    //   }
    
     
}
export interface InterfaceDepartmentList{
    deptid: Number;
    deptname: String;
}
export interface InterfaceLabList{
    labid: Number;
    labname: String;
}
export interface InterfaceTestList{
    testid: Number;
    testname: String;
    samplesize: String;
}