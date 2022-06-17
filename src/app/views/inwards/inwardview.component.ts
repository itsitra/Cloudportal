import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inwardview',
  templateUrl: './inwardview.component.html',
  styleUrls: ['./inwardview.component.css']
})
export class InwardviewComponent implements OnInit {
  public tabIndex : Number = 0;
  public loaderFlag : Boolean = false;
  public SessionInwardno : any = '';
  public SessionAccessno : any = '';
 
  constructor(
    private router: Router
    , private activatedRoute : ActivatedRoute
  ) { 
    this.SessionInwardno = String(this.activatedRoute.snapshot.params.inwardno);
    
  }

  ngOnInit(): void {
    this.tabIndex = 1;
  }
  changeTabIndex(index){
    this.loaderFlag = true;
    this.tabIndex = index;
    setTimeout(() => {
      this.loaderFlag = false;  
    }, 2000);
  }
}
