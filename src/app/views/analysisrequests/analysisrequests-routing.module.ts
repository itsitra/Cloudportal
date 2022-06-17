import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysisrequestsComponent } from './analysisrequests.component';

const routes: Routes = [
  {
    path: 'analysisrequests',
    component: AnalysisrequestsComponent,
    data: {
      title: 'analysisrequests'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisrequestsRoutingModule {}
