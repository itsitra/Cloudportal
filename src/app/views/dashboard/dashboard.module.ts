import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TestingcustomerdashboardComponent } from './testingcustomerdashboard.component';
// import { TestingcertificatesComponent } from './testingcertificates.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
    CarouselModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [ DashboardComponent, TestingcustomerdashboardComponent ]
})
export class DashboardModule { }
