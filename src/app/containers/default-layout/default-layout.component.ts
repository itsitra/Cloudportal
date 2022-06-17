import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public idletimerCount = '';
  public glbLoaderFlag: boolean = false;
  customername: string;
  constructor(
    private router: Router
    ) {
      this.glbLoaderFlag = environment.globalLoader;
      // console.log('loaderStatus : ' + environment.globalLoader);
      this.idletimerCount = localStorage.getItem('idleTimer');
      this.customername = localStorage.getItem('customername');
      /*if (localStorage.getItem('customerid') !== '') {
        this.router.navigateByUrl('dashboard');
      }*/
      // For set empty value when the browser or tab is closed
      /*window.onunload = () => {
        // Clear the local storage
        localStorage.setItem('customerid', '0');
     };*/
    }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  doLogout() {
    if (localStorage.getItem('customerid') !== '') {
      localStorage.setItem('customerid', '0');
      localStorage.setItem('lims_custid', '0');
      this.router.navigateByUrl('login');
    }
  }
}
