import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepareOrderPageRoutingModule } from './prepare-order-routing.module';

import { PrepareOrderPage } from './prepare-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrepareOrderPageRoutingModule
  ],
  declarations: [PrepareOrderPage]
})
export class PrepareOrderPageModule {}
