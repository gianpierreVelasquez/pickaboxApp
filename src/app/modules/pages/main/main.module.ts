import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    IonicModule,
    ComponentsModule
  ],
  declarations: [MainPage]
})
export class MainModule { }
