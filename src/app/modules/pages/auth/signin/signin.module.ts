import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SigninPageRoutingModule } from './signin-routing.module';
import { SigninPage } from './signin.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SigninPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
