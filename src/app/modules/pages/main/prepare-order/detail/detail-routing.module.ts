import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  },
  {
    path: 'package-detail',
    loadChildren: () => import('./package-detail/package-detail.module').then( m => m.PackageDetailPageModule)
  },  {
    path: 'qr-view',
    loadChildren: () => import('./qr-view/qr-view.module').then( m => m.QrViewPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
