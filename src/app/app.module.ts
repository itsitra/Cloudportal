import { BrowserModule } from '@angular/platform-browser';
import { UserIdleModule } from 'angular-user-idle';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { ComingsoonComponent } from './views/error/comingsoon.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
// import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { AnalysisRequestsComponent } from './views/analysis-requests/analysis-requests.component';
import { AnalysisrequestsComponent } from './views/analysisrequests/analysisrequests.component';
import { ReportsComponent } from './views/reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UkgComponent } from './views/ukg/ukg.component';
import { UkgmillComponent } from './views/ukgmill/ukgmill.component';
import { ParentcompComponent } from './views/parentcomp/parentcomp.component';
import { Child1Component } from './views/parentcomp/child1.component';
import { TestrateComponent } from './views/testrate/testrate.component';
import { PhytestrateComponent } from './views/testrate/phytestrate.component';
import { TestingchargeComponent } from './views/testrate/testingcharge.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UkgModule } from './views/ukg/ukg.module';
import { PaymentresponseComponent } from './views/paymentresponse/paymentresponse.component';
import { UkgpaymentComponent } from './views/ukgpayment/ukgpayment.component';
import { MypaymentsComponent } from './views/mypayments/mypayments.component';
import { PublicationsComponent } from './views/publications/publications.component';
import { PublicationslistComponent } from './views/publications/publicationslist.component';
import { PublicationsfocuslistComponent } from './views/publications/publicationsfocuslist.component';
import { TestingcertificatesComponent } from './views/dashboard/testingcertificates.component';
import { ContactusComponent } from './views/contactus/contactus.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './views/profile/profile.component';
import { CameraComponent } from './views/camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { RequestanalysisComponent } from './views/requestanalysis/requestanalysis.component';
import { AddupdaterequestanalysisComponent } from './views/requestanalysis/addupdaterequestanalysis.component';
import { WebinarComponent } from './views/webinar/webinar.component';
import { ViewinwardComponent } from './views/viewinward/viewinward.component';
import { InwarddetailsComponent } from './views/viewinward/inwarddetails.component';
import { SampletestsComponent } from './views/viewinward/sampletests.component';
import { FileuploadComponent } from './views/fileupload/fileupload.component';
import { RequestanalysisaddupdateComponent } from './views/requestanalysis/requestanalysisaddupdate.component';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InwardsComponent } from './views/inwards/inwards.component';
import { InwardviewComponent } from './views/inwards/inwardview.component';
import { InwardviewinwarddetailsComponent } from './views/inwards/inwardviewinwarddetails.component';
import { InwardviewsampletestsComponent } from './views/inwards/inwardviewsampletests.component';
import { FreqTestsListComponent } from './views/customer_freq_tests/freq-tests-list/freq-tests-list.component';
import { AddFreqTestsComponent } from './views/customer_freq_tests/add-freq-tests/add-freq-tests.component';
import { ProformaListComponent } from './views/proforma/proforma-list/proforma-list.component';
import { MatButtonModule } from '@angular/material/button'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PackageTestComponent } from './views/package-test/package-test.component';
// import Stepper from 'bs-stepper';

// import {NgxMqttClientModule} from 'ngx-mqtt-client';

//  const MQTT_CLIENT_OPTION = {
//     host: 'd8c9828635a1495f868831206b4428d4.s1.eu.hivemq.cloud',
//     protocol: 'mqtts',
//     port: 8883,
//     username : 'admin',
//     password : 'Admin@123',
//     path: '',
//     keepalive: 5
//  }

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    UserIdleModule.forRoot({idle: 6000, timeout: 60, ping: 120}),
    ModalModule,
    WebcamModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    // NgxMqttClientModule.forRoot(MQTT_CLIENT_OPTION)
    
    // MatStepperModule,
    //ZXingScannerModule,
    //BrowserQRCodeReader 
    /*NgxExtendedPdfViewerComponent*/
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ComingsoonComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    AnalysisRequestsComponent,
    AnalysisrequestsComponent,
    ReportsComponent,
    UkgComponent,
    UkgmillComponent,
    ParentcompComponent,
    Child1Component,
    TestrateComponent,
    PhytestrateComponent,
    TestingchargeComponent,
    PaymentresponseComponent,
    UkgpaymentComponent,
    MypaymentsComponent,
    PublicationsComponent,
    PublicationslistComponent,
    PublicationsfocuslistComponent,
    TestingcertificatesComponent,
    ContactusComponent,
    ProfileComponent,
    CameraComponent,
    RequestanalysisComponent,
    AddupdaterequestanalysisComponent,
    WebinarComponent,
    ViewinwardComponent,
    InwarddetailsComponent,
    SampletestsComponent,
    FileuploadComponent,
    RequestanalysisaddupdateComponent,
    InwardsComponent,
    InwardviewComponent,
    InwardviewinwarddetailsComponent,
    InwardviewsampletestsComponent,
    FreqTestsListComponent,
    AddFreqTestsComponent,
    ProformaListComponent,
    PackageTestComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
   },
   BsModalService,
   DatePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
