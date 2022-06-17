import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentcompComponent } from './parentcomp.component';

@Component({
  selector: 'app-parentchild',
  templateUrl: './child1.component.html',
  styleUrls: ['./parentcomp.component.css']
})

export class Child1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
