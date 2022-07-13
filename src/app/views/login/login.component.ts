import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { environment } from './../../../environments/environment';
import { AESEncryptDecryptServiceService } from '../../aesencrypt-decrypt-service.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  loginFormData = {
    email : ''
    , password : ''
  };
  SessionCustomerId: number = 0;
  spinnerFlag: boolean = false;
  spinnerFlag1: boolean = false;
  returnFlag: boolean = false;
  returnMessage = '';
  public reportParams = {
    inwardno : ''
    , accesscode : ''
  }
  public passwordReset = {
    registeredMoileNo : ''
    , otp : ''
    , msg : ''
    , status : false
    , enteredOtp :  ''
    , cloud_customer_id : ''
  }
  public resetPasswordFormData = {
    newpassword : ''
    , confirmpassword : ''
  }
  public resetPasswordLoader : boolean = false;
  public enableSendOtpButton : boolean = false;
  public enableVerifyOtpButton : boolean = false;
  public enableNewPassword : boolean = false;
  public enableSubmitButton : boolean = false;
  // inwardno : 'F2100633'
    // , accesscode : '49107'
  constructor(
    private router: Router
    , private http: HttpClient
    , private _AESEncryptDecryptService: AESEncryptDecryptServiceService
    ) {
      // this.SessionCustomerId = Number(localStorage.getItem('customerid'));
      // if (this.SessionCustomerId > 0) {
        // this.router.navigateByUrl('dashboard');
        localStorage.setItem('customerid', '0');
        localStorage.setItem('customername', '');
        localStorage.setItem('session_inwardno', '');
        localStorage.setItem('session_accessno', '');
        var mystring = "login";
        var b64 = btoa(mystring);
        var unicode = atob(b64);
        console.log(b64);
        console.log(unicode);

      // }
     }
  doLogin(): void {
    this.spinnerFlag = true;
    let return_values: any;
    if (this.loginFormData.email !== '' && this.loginFormData.password !== '') {
      this.http.post<any>(environment.apiUrl + 'validate_wallet_login', { data: this.loginFormData }).subscribe({
          next: data => {
            return_values = data;
            this.spinnerFlag = false;
            this.returnFlag = return_values.status;
            this.returnMessage = return_values.message;
            if (return_values.status === true) {
              localStorage.setItem('customerid', return_values.customerid);
              localStorage.setItem('customername', return_values.mill_organization_name);
              localStorage.setItem('lims_custid', return_values.lims_custid);
              localStorage.setItem('customer_type', return_values.customer_type);

              this.router.navigateByUrl('dashboard');
            }
          }
      });
    } else {
      this.returnFlag = false;
      this.returnMessage = 'Email / Password should not be Empty';
      this.spinnerFlag = false;
    }
  }
  goToRegisteration(): void {
    this.router.navigateByUrl('register');
  }
  downloadPdf(): void {
    // const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    const documentDefinition = {
      content: [
        {
          text: 'DOWNLOAD COUNT DETAILS',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            {
              text: 'Payment Reference : SITRA-UKG-1234234',
              style: 'header'
            }
          ],
          styles: {
            name: {
              fontSize: 12,
              bold: true
            }
          }
        },
        {
          columns: [
            {
              text: 'Payment Date : 31.12.2020 04.25 PM',
              style: 'header'
            }
          ],
          styles: {
            name: {
              fontSize: 12,
              bold: true
            }
          }
        },
        {
          text: 'Count Details',
          style: 'header'
        }
      ]};
    pdfMake.createPdf(documentDefinition).open();
  }
  async gotoInwardViewPage(){
    // let encryptedText = this._AESEncryptDecryptService.encrypt(this.reportParams.inwardno);
    // console.log('Encript ' + encryptedText);
    // let decryptedText = this._AESEncryptDecryptService.decrypt(encryptedText);
    // console.log('Decript ' + decryptedText);
    let errorCode = 0;
    if(this.reportParams.inwardno ===''){
      errorCode = 1;
    }
    if(this.reportParams.accesscode ===''){
      errorCode = 1;
    }
    if(errorCode === 0){
      //this.router.navigateByUrl('viewinward');
      this.spinnerFlag1 = true;
      let params = {
        inwardno : this.reportParams.inwardno
        , accesscode : this.reportParams.accesscode
      }
      await this.http.post<any>(environment.apiUrl + 'validate_inward_details', { data: params }).subscribe({
        next: data => {
          this.spinnerFlag1 = false;
          if(data.status === true){
            localStorage.setItem('session_inwardno', this.reportParams.inwardno);
            localStorage.setItem('session_accessno', this.reportParams.accesscode);
            this.router.navigateByUrl('viewinward');
          }
          //alert(data.status);
          // if (return_values.status === true) {
          //   localStorage.setItem('customerid', return_values.customerid);
          //   localStorage.setItem('customername', return_values.mill_organization_name);
          //   this.router.navigateByUrl('dashboard');
          // }
        }
    });

    }else{
      alert("Inwardno / Access code should not ba Empty");
    }
  }
  async validateRegistreredMobileNoForResetPassword(){
      if(this.passwordReset.registeredMoileNo !==''){
        this.resetPasswordLoader = true;
        let params = {
          mobileno : this.passwordReset.registeredMoileNo
        }
          await this.http.post<any>(environment.apiUrl + 'validate_registered_mobileno', { data: params }).subscribe({
            next: data => {
              this.resetPasswordLoader = false;
              if(data.status === true){
                 this.passwordReset.otp = data.otp;
                 this.passwordReset.cloud_customer_id = data.cloud_customer_id
              }
              this.passwordReset.msg = data.msg;
              this.passwordReset.status = data.status;
              //alert(data.status);
              // if (return_values.status === true) {
              //   localStorage.setItem('customerid', return_values.customerid);
              //   localStorage.setItem('customername', return_values.mill_organization_name);
              //   this.router.navigateByUrl('dashboard');
              // }
            }
        });
      }
  }
  clearResetPasswordParams(){
    this.passwordReset.registeredMoileNo = '';
    this.passwordReset.otp = '';
    this.resetPasswordFormData.newpassword = '';
    this.resetPasswordFormData.confirmpassword = '';
    this.passwordReset.msg = '';
    this.passwordReset.status = false;
  }
  enableSendOtpButtonFunction(){
      if( Number(this.passwordReset.registeredMoileNo.length) === 10){
        this.enableSendOtpButton = true;
      }else{
        this.enableSendOtpButton = false;
      }
  }
  enableVerifyOtpButtonFunction(){
    if( Number(this.passwordReset.enteredOtp.length) === 6){
      this.enableVerifyOtpButton = true;
    }else{
      this.enableVerifyOtpButton = false;
    }
  }
  validateOtpForResetPassword(){
    if(Number(this.passwordReset.otp) === Number(this.passwordReset.enteredOtp)){
      this.enableNewPassword = true;
      this.enableSubmitButton = true;
      this.passwordReset.msg = '';
    }else{
      this.passwordReset.msg = 'Entered OTP were wrong.';
      //this.passwordReset.status = false;
    }
  }
  async validateNewPassword(){
    if(this.resetPasswordFormData.newpassword === this.resetPasswordFormData.confirmpassword && this.passwordReset.cloud_customer_id !==''){
      this.resetPasswordLoader = true;
      let params = {
        cloud_customer_id : this.passwordReset.cloud_customer_id
        , newpassword : this.resetPasswordFormData.newpassword
      }
        await this.http.post<any>(environment.apiUrl + 'reset_cloud_customer_loginpassword', { data: params }).subscribe({
            next: data => {
              this.resetPasswordLoader = false;
              if(data.status === true){
                alert(data.msg);
                location.reload();
              }else{
                this.passwordReset.msg = data.msg;
              }
            }
        });
    }else{
      this.passwordReset.msg = "New password and Confirm password were not matched.";
    }
  }
  
}
