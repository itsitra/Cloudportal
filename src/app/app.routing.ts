import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { ComingsoonComponent } from './views/error/comingsoon.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AnalysisRequestsComponent } from './views/analysis-requests/analysis-requests.component';
import { AnalysisrequestsComponent } from './views/analysisrequests/analysisrequests.component';
import { UkgComponent } from './views/ukg/ukg.component';
import { UkgmillComponent } from './views/ukgmill/ukgmill.component';
import { ParentcompComponent } from './views/parentcomp/parentcomp.component';
import { Child1Component } from './views/parentcomp/child1.component';
import { PhytestrateComponent } from './views/testrate/phytestrate.component';
import { TestingchargeComponent } from './views/testrate/testingcharge.component';
import { PaymentresponseComponent } from './views/paymentresponse/paymentresponse.component';
import { UkgpaymentComponent } from './views/ukgpayment/ukgpayment.component';
import { MypaymentsComponent } from './views/mypayments/mypayments.component';
import { PublicationslistComponent } from './views/publications/publicationslist.component';
import { PublicationsfocuslistComponent } from './views/publications/publicationsfocuslist.component';
import { TestingcertificatesComponent } from './views/dashboard/testingcertificates.component';
import { ContactusComponent } from './views/contactus/contactus.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RequestanalysisComponent } from './views/requestanalysis/requestanalysis.component';
import { AddupdaterequestanalysisComponent } from './views/requestanalysis/addupdaterequestanalysis.component';
import { WebinarComponent } from './views/webinar/webinar.component';
import { ViewinwardComponent } from './views/viewinward/viewinward.component';
import { RequestanalysisaddupdateComponent } from './views/requestanalysis/requestanalysisaddupdate.component';
import { InwardsComponent } from './views/inwards/inwards.component';
import { InwardviewComponent } from './views/inwards/inwardview.component';
import { FreqTestsListComponent } from './views/customer_freq_tests/freq-tests-list/freq-tests-list.component';
import { AddFreqTestsComponent } from './views/customer_freq_tests/add-freq-tests/add-freq-tests.component';
import { ProformaListComponent } from './views/proforma/proforma-list/proforma-list.component';
import { PackageTestComponent } from './views/package-test/package-test.component';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'viewinward',
    component: ViewinwardComponent,
    data: {
      title: 'View Inward'
    }
  },
  {
    path: 'analysis_requests',
    component: AnalysisRequestsComponent,
    data: {
      title: 'Analysis Request'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Login'
      , href : 'base'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'analysisrequests',
        component : AnalysisrequestsComponent,
        /*loadChildren: () => import('./views/analysisrequests/analysisrequests.module').then(m => m.AnalysisrequestsModule)*/
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: 'ukgpayment',
        /*loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)*/
        component : UkgpaymentComponent,
        data: {
          title: ' Conversion Factors / UKG CF Payments',
        },
        /*loadChildren: () => import('./views/analysisrequests/analysisrequests.module').then(m => m.AnalysisrequestsModule)*/
      },
      {
        path: 'ukg',
        /*loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)*/
        component : UkgComponent,
        data: {
          title: ' Converstion Factors / Standard UKG',
        },
        /*loadChildren: () => import('./views/analysisrequests/analysisrequests.module').then(m => m.AnalysisrequestsModule)*/
      },
      {
        path: 'ukgmill',
        component : UkgmillComponent,
        data: {
          title: 'Converstion Factors / Mill Adjusted UKG',
        },
        /*loadChildren: () => import('./views/analysisrequests/analysisrequests.module').then(m => m.AnalysisrequestsModule)*/
      },
      {
        path: 'testrate/testingcharge/:deptid',
        component : TestingchargeComponent,
        data: {
          title: 'Testing Details',
        },
        /*loadChildren: () => import('./views/analysisrequests/analysisrequests.module').then(m => m.AnalysisrequestsModule)*/
      },
      {
        path: 'paymentresponse/:responseid',
        component : PaymentresponseComponent,
        data: {
          title: 'Testing Details',
        },
        /*loadChildren: () => import('./views/analysisrequests/analysisrequests.module').then(m => m.AnalysisrequestsModule)*/
      },
      {
        path: 'publications/publicationlists',
        component : PublicationslistComponent,
        data: {
          title: 'Publication List',
        }
      },
      {
        path: 'publications/publicationfocuslists',
        component : PublicationsfocuslistComponent,
        data: {
          title: 'Publication Focus List',
        }
      },
      {
        path: 'mypayments/:type',
        component : MypaymentsComponent,
        data: {
          title: 'My Payments',
       }
        /*loadChildren: () => import('./views/analysisrequests/analysisrequests.module').then(m => m.AnalysisrequestsModule)*/
      },
      {
        path: 'certificates',
        component: TestingcertificatesComponent,
        data: {
          title: 'Testing / NABL Certificates'
        }
      },
      {
        path: 'contactus',
        component: ContactusComponent,
        data: {
          title: 'Contact Us'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'My Profile'
        }
      },
       
      {
        path: 'requestanalysis',
        component: RequestanalysisComponent,
        data: {
          title: 'Request Analysis'
        }
      },
      {
        path: 'addupdaterequestanalysis/:reqno',
        component: AddupdaterequestanalysisComponent,
        data: {
          title: 'Add or Update Request Analysis'
        }
      },{
        path: 'webinar',
        component: WebinarComponent,
        data: {
          title: 'Webinar'
        }
      },
      {
        path: 'requestanalysisaddupdate/:reqno',
        component: RequestanalysisaddupdateComponent,
        data: {
          title: 'View Inward'
        }
      },
      {
        path: 'viewinwarddetails',
        component: ViewinwardComponent,
        data: {
          title: 'View Inward'
        }
      },
      {
        path: 'inwards',
        component: InwardsComponent,
        data: {
          title: 'Inwards'
        }
      },
      {
        path: 'inwardview/:inwardno',
        component: InwardviewComponent,
        data: {
          title: 'Inward View'
        }
      },
      
      
      {
        path: 'comingsoon',
        component: ComingsoonComponent,
        data: {
          title: 'Coming Soon'
        }
      },
      {path:'frequenttests/list', component:FreqTestsListComponent, data:{ title:'Frequent Test List'}},
      
      {path:'frequenttests/add', component:AddFreqTestsComponent, data:{ title:'Add Frequent Test'}},

      {path:'proforma/list', component:ProformaListComponent, data:{ title:'Proforma List'}},

      {path:'package_test/list', component:PackageTestComponent,data:{title:'Package Test List'}},

    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
