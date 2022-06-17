import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  public SessionCustomerId: number = 0;
  constructor(
    private router: Router
  ) {
    this.SessionCustomerId = Number(localStorage.getItem('customerid'));
   }

  ngOnInit(): void {
    if (this.SessionCustomerId <= 0) {
      this.router.navigateByUrl('login');
    }
  }

}
