import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        loadChildren: () => import('./signin/signin.module').then(m => m.SigninPageModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
