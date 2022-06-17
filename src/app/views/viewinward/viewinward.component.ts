import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewinward',
  templateUrl: './viewinward.component.html',
  styleUrls: ['./viewinward.component.css']
})
export class ViewinwardComponent implements OnInit {
  public tabIndex : Number = 0;
  public loaderFlag : Boolean = false;
  public SessionInwardno : any = '';
  public SessionAccessno : any = '';
 
  constructor(
    private router: Router
  ) { 
    this.SessionInwardno = localStorage.getItem('session_inwardno');
    this.SessionAccessno = localStorage.getItem('session_accessno');
  }

  ngOnInit(): void {
    this.tabIndex = 1;
    if(this.SessionInwardno ==='' || this.SessionAccessno === ''){
      this.router.navigateByUrl('login');
    }
  }
  changeTabIndex(index){
    this.loaderFlag = true;
    this.tabIndex = index;
    setTimeout(() => {
      this.loaderFlag = false;  
    }, 2000);
  }
  gotoLoginPage(){
    this.router.navigateByUrl('login');
  }

}
