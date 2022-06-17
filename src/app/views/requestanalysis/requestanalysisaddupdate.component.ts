import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from './../../../environments/environment';
import { AESEncryptDecryptServiceService } from '../../aesencrypt-decrypt-service.service';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { FreqentTestService } from '../../_services/freqent-test.service';




@Component({
  selector: 'app-requestanalysisaddupdate',
  templateUrl: './requestanalysisaddupdate.component.html',
  styleUrls: ['./requestanalysis.component.css']
})
export class RequestanalysisaddupdateComponent implements OnInit {
    public SessionCustomerId: number = 0;  
    public SessionLimsCustomerId : number = 0;
    public spinnerFlag: boolean = false;
    public requestNumber: any = '';
    public departmentList: InterfaceDepartmentList[];
    public labList: InterfaceLabList[];
    public testList: InterfaceTestList[];
    public sampleLists : SampleLists[] = [];
    public sampleGridData : any[] = [];
    public sampleTypeLists : SampleTypeList[] = [];
    public sampleTypeListForDisplay : any[] = [];
    public formData = {
        reqno : ''
        , deptid : '8'
        , labid: '101'
        , noofsamples : 0
        , sample_return : ''
        , mode_of_payment : ''
        , despatch_date : ''
        , mill_reference_no : ''
        , comments : ''
        , dd_cheque_reference : ''
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
    public sampleEntryFormData = {
        index : ''
        , sampletype : ''
        , count : ''
        , desc1 : ''
        , desc2 : ''
        , ply : ''
        , blend : ''
        , remarks : ''
    }
    public disableInput = {
        deptid : 0
        , labid : 0
    }
    public testPopupLoader : boolean = false;
    public txtTestSearch : any = '';
    public samplesWithTestArray = {
        sampleno : ''
        , tests : []
    };
    public sampleAndTestArray : SampleArrayWithTest[] = [];
    public samplesAndTestsArrayTesting : any[] = [];
    public SamplePopupProperty = {
        sampleno : ''
        , nooftests : 0
        , hascopytoall : ''
        , rowIndex : 0
    }
    
    public totalTestingCharge : number = 0.00;
    public totalGstCharge : Number = 0.00;
    public testingGrandTotal : Number = 0.00;
    public dynamicIndexForTesting : Number = 0;
    public randomUniqNo : any = '';
    public validationErrors : ValidationErrors[] = [];
    public pageValidationLoaderState = {
        header : 0
        , samplegrid : 0
        , tests : 0
        , overall : 0
        , database : 0
    }
    public validationPopupHeaderMessage : any = 'Validation Processing...';
    postData: { custid: any; search: any; };
    constructor(
    private http: HttpClient
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private _AESEncryptDecryptService: AESEncryptDecryptServiceService
    ,private FrequentTestService:FreqentTestService
    ) {
        this.SessionCustomerId = Number(localStorage.getItem('customerid'));
        this.SessionLimsCustomerId = Number(localStorage.getItem('lims_custid'));
        //alert(this.SessionLimsCustomerId);
    }

    ngOnInit(): void {  
        const uuid = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        let datetime = new Date();

        this.randomUniqNo = uuid+datetime.getDate()+datetime.getMonth()+datetime.getFullYear()+datetime.getHours()+datetime.getMinutes()+datetime.getMilliseconds();
        // const routeParams = this.activeRoute.snapshot.params;
        if (this.SessionCustomerId <= 0) {
            this.router.navigateByUrl('login');
        }
        this.activatedRoute.params.subscribe(routeParams => {
            let tmpreqno = this.activatedRoute.snapshot.params.reqno; 
            console.log('Actual ' + tmpreqno);
            let enCryptString =   tmpreqno.replaceAll('*','/');         
            console.log('After replaced ' + enCryptString);
            let decryptedText = this._AESEncryptDecryptService.decrypt(tmpreqno);
            console.log('Decript ' + decryptedText);
        });
        this.loadDepartmentList();
        this.loadSampleTypeForDisplay();
        this.loadLabList();
        // this.samplesWithTestArray.push({
        //     sampleno : '12'
        //     , test : []
        // })
        // console.log('+++++++++++++++++++++++++');
        // console.log(this.samplesWithTestArray);
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
                    this.loadSampleType();
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

            this.postData = {
                custid: this.SessionCustomerId,
                search: this.txtTestSearch
              }
              this.FrequentTestService.getFrequentTests(JSON.stringify(this.postData)).subscribe(res => {
                let result = res.data;
                this.testList = result;        
                console.log(result);
              }, err => {
                alert("something went wrong");
                console.log(err);
              });

            // let params = {
            //     searchedText : this.txtTestSearch,
            //     unique_id : this.randomUniqNo,
            //     sampleno : this.SamplePopupProperty.sampleno
            // }
            // this.testPopupLoader = true;

            // await this.http.post<any>(environment.apiUrl + 'get_testing_charges/' + this.formData.deptid +'/'+ this.formData.labid, { data : params }).subscribe({
            //     next: data => {
            //         // console.log('--------------------DATA START-----------------');
            //         this.testList = data.data;                    
            //         this.testPopupLoader = false;
            //     },
            //     error: error => {
            //         console.log(error);
            //     }
            // });
        }
    }
    async prePayloadTestSelectionPopup(paramSampleNo){
        
        this.SamplePopupProperty.sampleno = paramSampleNo + 1;
        //alert(this.SamplePopupProperty.sampleno);
            this.SamplePopupProperty.nooftests = 0;
            this.SamplePopupProperty.hascopytoall = '';
            this.SamplePopupProperty.rowIndex = paramSampleNo;
            this.loadTestList();
            //console.log(this.testList);
            

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
    async loadSampleType(){
        if(this.formData.deptid !== '' && this.formData.labid !==''){
            let params = {
                labid : this.formData.labid
            }
            await this.http.post<any>(environment.apiUrl + 'get_sampletype_list/1', { data : params }).subscribe({
                next: data => {
                    // console.log('--------------------DATA START-----------------');
                    this.sampleTypeLists = data;
                },
                error: error => {
                    console.log(error);
                }
            });
        }
    }
    async loadSampleTypeForDisplay(){
        await this.http.post<any>(environment.apiUrl + 'get_sampletype_list/', { data : '' }).subscribe({
            next: data => {
                // console.log('--------------------DATA START-----------------');
                this.sampleTypeListForDisplay = data;
            },
            error: error => {
                console.log(error);
            }
        });
    }
    
    addUpdateSampleGrid(){
        let error = false;
        if(this.sampleEntryFormData.sampletype === ''){
            error = true;
        }
        if(this.sampleEntryFormData.desc1 === ''){
            error = true;
        }
        if(!error){
            console.log('--- No Error --')
            if(this.sampleEntryFormData.index === ''){
                console.log('--- No Existing Records --')
                this.sampleGridData.push(
                    {
                        sampletype : this.sampleEntryFormData.sampletype
                        , count : this.sampleEntryFormData.count
                        , desc1 : this.sampleEntryFormData.desc1
                        , desc2 : this.sampleEntryFormData.desc2
                        , ply : this.sampleEntryFormData.ply
                        , blend : this.sampleEntryFormData.blend
                        , remarks : this.sampleEntryFormData.remarks
                    }
                )
                
            }else{
                this.sampleGridData[this.sampleEntryFormData.index].sampletype = this.sampleEntryFormData.sampletype;
                this.sampleGridData[this.sampleEntryFormData.index].count = this.sampleEntryFormData.count;
                this.sampleGridData[this.sampleEntryFormData.index].desc1 = this.sampleEntryFormData.desc1;
                this.sampleGridData[this.sampleEntryFormData.index].desc2 = this.sampleEntryFormData.desc2;
                this.sampleGridData[this.sampleEntryFormData.index].ply = this.sampleEntryFormData.ply;
                this.sampleGridData[this.sampleEntryFormData.index].blend = this.sampleEntryFormData.blend;
                this.sampleGridData[this.sampleEntryFormData.index].remarks = this.sampleEntryFormData.remarks;
            }
            this.sampleEntryFormData.index = '';
            this.sampleEntryFormData.sampletype = '';
            this.sampleEntryFormData.count = '';
            this.sampleEntryFormData.desc1 = '';
            this.sampleEntryFormData.desc2 = '';
            this.sampleEntryFormData.ply = '';
            this.sampleEntryFormData.blend = '';

            this.sampleEntryFormData.remarks = '';
            
            if(this.sampleGridData.length > 0){
                this.disableInput.deptid = 1;
                this.disableInput.labid = 1; 
            }
        }else{
            alert("Fill the Mandatory field(s)");
        }
    }
    async removeSampleGridDataRow(index) {
        const confirmFlag = confirm('Do you want to remove this count ?');
        if (confirmFlag === true) {          
          if (index !== -1) {
              this.sampleGridData.splice(index, 1);
              this.samplesWithTestArray.tests = this.samplesWithTestArray.tests.filter(item => item.sampleno !== (index+1));        
              if(this.sampleGridData.length === 0){
                 this.disableInput.deptid = 0;
                 this.disableInput.labid = 0; 
               }
               // remove temp table data
               let params = {
                    uniqno : this.randomUniqNo
                    , sampleno : index+1
               }
               await this.http.post<any>(environment.apiUrl + 'temptb_delete_samples_with_tests/', { data : params }).subscribe({
                    next: data => {
                        if(this.samplesWithTestArray.tests.length > 0){
                            for(let j = 0; j <= this.samplesWithTestArray.tests.length; j++){
                                this.totalTestingCharge = Number(this.totalTestingCharge) - Number(this.samplesWithTestArray.tests[j].rate);
                            }
                        }else{
                            this.totalTestingCharge = 0;
                        }
                    },
                    error: error => {
                    }
                });
          }
        }
    }
    editSampleGridDataRow(index, sampleData){
        this.sampleEntryFormData.index = index;
        this.sampleEntryFormData.sampletype = sampleData.sampletype;
        this.sampleEntryFormData.count = sampleData.count;
        this.sampleEntryFormData.desc1 = sampleData.desc1;
        this.sampleEntryFormData.desc2 = sampleData.desc2;
        this.sampleEntryFormData.ply = sampleData.ply;
        this.sampleEntryFormData.blend = sampleData.blend;

        this.sampleEntryFormData.remarks = sampleData.remarks;

    }
    setTestId(selectedTestId, event, testRate, sampleNo){
        //console.log(event.target.checked);
        if(event.target.checked === true){
            var isPresent = this.samplesWithTestArray.tests.some(function(el){ 
                if(el.sampleno === sampleNo && el.testid === selectedTestId )
                    return true;
                else   
                    return false;
            });
            if(!isPresent){
                this.samplesWithTestArray.tests.push(
                    {sampleno : sampleNo, testid : selectedTestId, rate : testRate}
                );
                this.SamplePopupProperty.nooftests = Number(this.SamplePopupProperty.nooftests) + 1;
                this.totalTestingCharge = Number(this.totalTestingCharge) + Number(testRate);
            }
        }else{    
            this.samplesWithTestArray.tests = this.samplesWithTestArray.tests.filter(item => item.testid !== selectedTestId);                    
             this.SamplePopupProperty.nooftests = Number(this.SamplePopupProperty.nooftests) - 1;
             this.totalTestingCharge = Number(this.totalTestingCharge) - Number(testRate);
        }
        console.log(this.samplesWithTestArray);
    }
    async updateSampleArray(){
        this.testPopupLoader = true;        
        let params = {
            samples_with_tests : this.samplesWithTestArray
            , uniqno : this.randomUniqNo
            , sampleno : this.SamplePopupProperty.sampleno
        }
        //randomUniqNo
        await this.http.post<any>(environment.apiUrl + 'temptb_insert_samples_with_tests/', { data : params }).subscribe({
            next: data => {
                this.testPopupLoader = false;
                //document.getElementById('#btnPopupClose').click();
            },
            error: error => {
            }
        });
        
    }
    checkTestArray(indexId, sampleNo){
        var sno = Number(this.dynamicIndexForTesting)+1;
        let tempArray = {
            sampleno : String(sno)
            , tests : []
        }
        var a = tempArray;
        this.sampleAndTestArray.push(a);
        console.log(this.sampleAndTestArray);
        this.dynamicIndexForTesting = sno;
    }
    saveUpdateRequestAnalysis(){
        this.validationErrors = [];
        this.pageValidationLoaderState.header = 1;
        this.pageValidationLoaderState.samplegrid = 1;
        this.pageValidationLoaderState.tests = 1;
        this.pageValidationLoaderState.database = 1;
        this.pageValidationLoaderState.overall = 0;
        let errorFlag = 0;
        let params = {
            lims_custid : this.SessionLimsCustomerId
            , cloud_customer_id : this.SessionCustomerId
            , header_data : this.formData
            , sample_grid_data : this.sampleGridData
            , uniqno : this.randomUniqNo
            , samples_with_tests : this.samplesWithTestArray
        }
        // Validation start over here
        if(this.formData.deptid === ''){
            this.validationErrors.push(
                {message : '*Department should not be Empty'}
            )
        }
        
        if(this.formData.labid === ''){
            this.validationErrors.push(
                {message : '*Lab should not be Empty'}
            )
        } 
                
        if(this.formData.labid === ''){
            this.validationErrors.push(
                {message : '*Lab should not be Empty'}
            )
        }
        if(this.formData.sample_return === ''){
            this.validationErrors.push(
                {message : '*Sample return should not be Empty'}
            )
        }
        if(this.formData.mode_of_payment === ''){
            this.validationErrors.push(
                {message : '*Mode of Payment should not be Empty'}
            )
        }
        if(this.formData.despatch_date === ''){
            this.validationErrors.push(
                {message : '*Dispacth date should not be Empty'}
            )
        }
        if(this.formData.mill_reference_no === ''){
            this.validationErrors.push(
                {message : '*Mill Reference should not be Empty'}
            )
        }
        setTimeout(()=>{
            if(this.validationErrors.length === 0){
                this.pageValidationLoaderState.header = 2;
            }else{
                this.pageValidationLoaderState.header = 3;
            }
        },1000);
        setTimeout(()=>{
            if(this.sampleGridData.length > 0){
                this.pageValidationLoaderState.samplegrid = 2;
                this.validationPopupHeaderMessage = 'Database Transaction Processing...';
            }else{
                this.pageValidationLoaderState.samplegrid = 3;
            }
        }, 1500);

        setTimeout(async ()=>{
            if(this.samplesWithTestArray.tests.length> 0){
                this.pageValidationLoaderState.tests = 2;
            }else{
                this.pageValidationLoaderState.tests = 3;
            }
            if(this.pageValidationLoaderState.header === 2 && this.pageValidationLoaderState.samplegrid === 2 && this.pageValidationLoaderState.tests === 2){
               this.pageValidationLoaderState.overall = 1;
               // Start DB Transcation
                await this.http.post<any>(environment.apiUrl + 'insert_update_request_analysis/', { data : params }).subscribe({
                    next: data => {
                        //alert(data.message);
                        if(data.status === true){
                            this.validationPopupHeaderMessage = 'Analysis Request saved Successfully';
                            this.pageValidationLoaderState.database = 2;
                            setTimeout(()=>{
                                this.router.navigateByUrl('requestanalysis');
                            },1000)
                        }else{
                            this.validationPopupHeaderMessage = 'Error while save analysis request..!';
                        }
                    },
                    error: error => {
                    }
                });
            }else{
                this.pageValidationLoaderState.overall = 2;
            }
        }, 2000);
        
        console.log(this.validationErrors.length);

         
        // Validation end
        console.log(this.validationErrors);
        //console.log(params);
    }
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
    memrate : any;
    nonmemrate : any;
    selected : string;
}
export interface SampleLists{    
    sampletype : any;
    count: any;
    desc1 : any;
    desc2 : any;
    ply : any;
    blend : any;
    remarks : any;
}
export interface SampleTypeList{
    deptid: Number;
    deptname: String;
}
export interface TestArray{
    testid : any;
}
export interface SampleArrayWithTest{
    sampleno : string;
    tests : TestArray[];
}
export interface ValidationErrors{
    message : string;
}

