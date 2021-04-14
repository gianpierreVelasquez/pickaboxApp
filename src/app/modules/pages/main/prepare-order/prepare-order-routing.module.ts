import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareOrderPage } from './prepare-order.page';

const routes: Routes = [
  {
    path: '',
    component: PrepareOrderPage
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
export class PrepareOrderPageRoutingModule {}
