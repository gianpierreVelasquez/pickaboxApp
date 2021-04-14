import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SigninPageRoutingModule } from './signin-routing.module';
import { SigninPage } from './signin.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SigninPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
