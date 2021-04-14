import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'prepare-order',
        loadChildren: () => import('./prepare-order/prepare-order.module').then( m => m.PrepareOrderPageModule)
      },
      {
        path: 'check-order',
        loadChildren: () => import('./check-order/check-order.module').then( m => m.CheckOrderPageModule)
      },
      {
        path: 'deliver-order',
        loadChildren: () => import('./deliver-order/deliver-order.module').then( m => m.DeliverOrderPageModule)
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then( m => m.MonitorPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
