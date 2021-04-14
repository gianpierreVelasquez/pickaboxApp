import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverOrderPage } from './deliver-order.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverOrderPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverOrderPageRoutingModule {}
