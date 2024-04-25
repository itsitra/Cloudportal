import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit  {
    RegFormData = {
    regtype: ''
    , mill_organization_name: ''
    , contact_person_name: ''
    , contact_person_mobileno: ''
    , alternative_contactnos: ''
    , email: ''
    , address1: ''
    , address2: ''
    , city: ''
    , state: ''
    , pincode: ''
    , gstregtype: 'N'
    , gstno: ''
    , cloud_customer_id: ''
    , email_otp: 0
    , mobile_otp: 0
  };
  reg_type: any;
  returnFlag: boolean;
  returnMessage = '';
  spinnerFlag: boolean = false;
  public errorMessages: any = '';
  public stateNameLists: any = [];
  public ServerSideData = {
    email_otp: Number('')
    , mobile_otp: Number('')
  };
  constructor(
    private http: HttpClient
    , private router: Router
  ) { }
  ngOnInit() {
    this.loadStateDropdownValues();
  }
  loadStateDropdownValues() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>(environment.apiUrl + 'get_statename_list/', { data: '' }).subscribe({
        next: data => {
          this.stateNameLists = data;
        },
        error: error => {
          // console.error('There was an error!', error);
        }
    });
  }
  formData() {
    this.returnFlag = false;
    this.returnMessage = '';
    let return_values: any;
    // tslint:disable-next-line:max-line-length
    this.spinnerFlag = true;
    this.http.post<any>(environment.apiUrl + 'newRegistration', { data: this.RegFormData }).subscribe({
        next: data => {
          return_values = data;
          this.spinnerFlag = false;
          this.returnFlag = return_values.status;
          this.returnMessage = return_values.message;
        }
    });
  }
  validateFormData() {
    this.spinnerFlag = true;
    this.errorMessages = '';

    this.returnMessage = '';
    this.returnFlag = false;
    if (this.RegFormData.regtype === '') {
      this.errorMessages = 'Reg. Type should not Empty.';
    }
    if (this.RegFormData.mill_organization_name === '') {
      this.errorMessages = 'Mill / Organization should not Empty.';
    }
    if (this.RegFormData.contact_person_name === '') {
      this.errorMessages = 'Contact person name should not Empty.';
    }
    if (this.RegFormData.contact_person_mobileno === '') {
      this.errorMessages = 'Mobile should not Empty.';
    }
    if (this.RegFormData.email === '') {
      this.errorMessages = 'Email should not Empty.';
    }
    if (this.RegFormData.address1 === '') {
      this.errorMessages = 'Address 1 should not Empty.';
    }
    if (this.RegFormData.city === '') {
      this.errorMessages = 'City should not Empty.';
    }
    if (this.RegFormData.state === '') {
      this.errorMessages = 'State should not Empty.';
    }
    if (this.RegFormData.pincode === '') {
      this.errorMessages = 'Pincode should not Empty.';
    }
    if (this.RegFormData.gstregtype === '') {
      this.errorMessages = 'GST Registration type should not Empty.';
    }
    if (this.RegFormData.gstregtype === 'Y' && this.RegFormData.gstno === '') {
      this.errorMessages = 'GST No should not Empty.';
    }
    // For validate email and mobile send OTP
    if (this.errorMessages === '') {
      this.http.post<any>(environment.apiUrl + 'newRegistration', { data: this.RegFormData }).subscribe({
        next: data => {
          // setTimeout(function() {
             // }, 500);
            if (data.status === true) {
              this.RegFormData.cloud_customer_id = data.cloud_customer_id;
              this.ServerSideData.email_otp = Number(data.email_otp);
              this.ServerSideData.mobile_otp = Number(data.mobile_otp);
              this.returnFlag = true;
              this.returnMessage = data.message;
              if (data.mailstatus === true && data.smsstatus === true) {
                this.spinnerFlag = false;
              }
            } else if (data.status === false) {
              this.returnFlag = false;
              this.returnMessage = data.message;
              this.spinnerFlag = false;
            }
        }
     });
    }
  }
  backToLoginPage(): void {
    // this.router.navigateByUrl('login');
    history.back();
  }
  validateOtp() {
    this.returnMessage = '';
    this.returnFlag = false;
    if ((Number(this.RegFormData.mobile_otp) > 0 )) {
      this.spinnerFlag = true;
      // tslint:disable-next-line:max-line-length
      if ( Number(this.ServerSideData.mobile_otp) === Number(this.RegFormData.mobile_otp) ) {
          // tslint:disable-next-line:max-line-length
          this.http.post<any>(environment.apiUrl + 'update_registration_status/' + this.RegFormData.cloud_customer_id, { data: this.RegFormData }).subscribe({
            next: data => {
                this.returnFlag = data.status;
                  this.spinnerFlag = false;
                  this.returnMessage = data.msg;
            }
        });
      } else {
        this.returnFlag = false;
        this.spinnerFlag = false;
        this.returnMessage = 'OTP were In-Correct';
      }
    } else {
      this.returnFlag = false;
      this.spinnerFlag = false;
      this.returnMessage = ' Mobile OTP should be in Numberic';
    }
  }
}
