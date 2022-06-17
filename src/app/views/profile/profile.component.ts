import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public SessionCustomerId: number = 0;
  public spinnerFlag: boolean = false;
  public loggedUserData = {
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
    , gstregtype: ''
    , gstno: ''
    , password: ''
  };
  public stateNameLists: any = [];
  public passwordchange = {
    currentpassword: ''
    , newpassword: ''
    , confirmpassword: ''
  };
  public passwordchangeMsg = '';
  constructor(
    private router: Router
    , private http: HttpClient
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
  }

  ngOnInit(): void {
    if (this.SessionCustomerId <= 0) {
      this.router.navigateByUrl('login');
    }
    this.loadCustomerProfileData();
    this.loadStateDropdownValues();
  }
  loadCustomerProfileData() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>(environment.apiUrl + 'get_logged_userdetails/' + this.SessionCustomerId + '/1', { data: '' }).subscribe({
      next: data => {
        this.loggedUserData = data;
        console.log(this.loggedUserData);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
  loadStateDropdownValues() {
    // tslint:disable-next-line:max-line-length
    this.http.post<any>(environment.apiUrl + 'get_statename_list/', { data: '' }).subscribe({
        next: data => {
          this.stateNameLists = data;
          console.log(this.stateNameLists);
        },
        error: error => {
          console.error('There was an error!', error);
        }
    });
  }
  doPasswordUpdate() {
    this.spinnerFlag = true;
    if (this.passwordchange.newpassword !== '' && this.passwordchange.newpassword !== '') {
      if (String(this.passwordchange.newpassword) === String(this.passwordchange.confirmpassword)) {
        this.passwordchangeMsg = '';
        if (String(this.loggedUserData.password) === String(this.passwordchange.currentpassword)) {
          this.passwordchangeMsg = '';
          // tslint:disable-next-line:max-line-length
            this.http.post<any>(environment.apiUrl + 'password_update/' + this.SessionCustomerId, { data: this.passwordchange }).subscribe({
              next: data => {
                console.log(data);
                this.passwordchangeMsg = data.msg;
                if (data.status === true) {
                    setTimeout(() => {
                      localStorage.setItem('customerid', '0');
                      this.router.navigateByUrl('login');
                      this.spinnerFlag = false;
                    }, 5000);
                }
              },
              error: error => {
                console.error('There was an error!', error);
              }
          });
        } else {
          this.passwordchangeMsg = 'Current password is Incorrect';
          this.spinnerFlag = false;
        }
      } else {
        this.passwordchangeMsg = 'New password and Confirm password is mismatch.';
        this.spinnerFlag = false;
      }
    } else {
      this.passwordchangeMsg = 'New password / Confirm password should not be Empty';
      this.spinnerFlag = false;
    }
  }

}
