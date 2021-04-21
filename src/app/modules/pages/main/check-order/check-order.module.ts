import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckOrderPageRoutingModule } from './check-order-routing.module';

import { CheckOrderPage } from './check-order.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckOrderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CheckOrderPage]
})
export class CheckOrderPageModule {}
