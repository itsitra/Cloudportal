import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { FreqentTestService } from '../../../_services/freqent-test.service';


@Component({
  selector: 'app-freq-tests-list',
  templateUrl: './freq-tests-list.component.html',
  styleUrls: ['./freq-tests-list.component.css']
})
export class FreqTestsListComponent implements OnInit {
  private customerId: number;
  frequentTestList=[];
  postData: {custid: number; search: string; tablerowstart:number; tablerowlimit:number};


  modalRef: BsModalRef;
  SlectedTest: { custid: number; testid: number; };
  DeleteTest: { custid: number; testid: number; };
  testList = [];
  TestMasterList: any[];
  PaginatedFreqTestList: any[];
  FreqTestItemperpage: any = 10;
  itemperpage: number= 10;
  searchText: any= "";
  PaginatedTestMasterList: any;
  searchTestMaster:any;
  testMasterpostData: { custid: number; searchedtext: any; };

  constructor(@Inject(FreqentTestService) private FrequentTestService: FreqentTestService, private modalService: BsModalService) {
    this.customerId = Number(localStorage.getItem('customerid'));
   
  }

  ngOnInit(): void {

    //get list for freaquently used test
    this.getFrequentTest();

    //fetch test master data for slection grid
    this.fetchTestMaster();

  }
  getFrequentTest() {
    this.postData = {
      custid: this.customerId,
      search: this.searchText,
      tablerowstart:1,
      tablerowlimit:10000
    }
    this.FrequentTestService.getFrequentTests(JSON.stringify(this.postData)).subscribe(res => {
      let result = res.data;
      this.frequentTestList = result;
      this.PaginatedFreqTestList=this.frequentTestList.slice(0, this.FreqTestItemperpage);

      console.log(result);
    }, err => {
      alert("something went wrong");
      console.log(err);
    });
  }

  fetchTestMaster() {
    this.testMasterpostData = {
      custid: this.customerId,
      searchedtext: this.searchTestMaster
    }
    var postData = JSON.stringify(this.testMasterpostData);
    this.FrequentTestService.fetchTestMasterData(postData).subscribe((res) => {
      let result = res;
      this.TestMasterList = result;
      this.PaginatedTestMasterList=this.TestMasterList.slice(0, 20);
      console.log(result);
    }, err => {
      alert("something went wrong");
      console.log(err);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg modal-success' });
  }
  Modelclose() {
    this.modalRef.hide();
    this.testList = [];
  }
  testselection(event, Testid) {
    let isexsists = this.testList.findIndex(x => x.testid == Testid);
    if (isexsists > -1) {
      this.testList.splice(isexsists, 1);
      // console.log(this.testList);
      return;
    }
    this.testList.push({ custid: this.customerId, testid: Testid })
    console.log(this.testList);
  }

  StoreNewFreqTestList() {
    this.FrequentTestService.insertCustFreqtests(this.testList).subscribe((res) => {
      let result = res;
  
      // result.status == true ? alert("Added to Freqent Used Tests Successfully") : alert("something went WRONG");
      if (!result.status) {
        Swal.fire('ERROR', 'something went WRONG', 'error');
      } else {
        Swal.fire('SUCCESS', 'Added to Freqent Used Tests Successfully', 'success');
      }
      this.Modelclose();
      this.fetchTestMaster();
      this.getFrequentTest();
    })
  }

 

  DeleteFreqTest(TestId) {
    // let confirmFlag = confirm("Do you want to delete this?")
    Swal.fire({
      title: 'Do you want to Delete this?',
      confirmButtonText: 'Confirm',
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value) {
        this.DeleteTest = { custid: this.customerId, testid: TestId };
        this.FrequentTestService.deleteCustFreqTests(JSON.stringify(this.DeleteTest)).subscribe((res) => {
          let result = res;
          if (result.status == true) { 
            Swal.fire('Deleted','Successfully deleted From Freqent Used Tests')
          } else { 
            alert("something went WRONG") 
          };
          this.getFrequentTest();
        }, (err) => {
          console.log(err);
        });
      }
    })
  }
  itemPerPage(){
    this.freqTestPageChanged({itemsPerPage:this.FreqTestItemperpage,page:1});
  }

  freqTestPageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    // this.returnedArray = this.contentArray.slice(startItem, endItem);
    this.PaginatedFreqTestList=this.frequentTestList.slice(startItem, endItem);
  }
}
