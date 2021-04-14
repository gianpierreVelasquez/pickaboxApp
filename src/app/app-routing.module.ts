import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/layout/admin/admin.component';
import { AuthComponent } from './modules/layout/authentication/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: () => import('./modules/pages/main/main.module').then(m => m.MainModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
