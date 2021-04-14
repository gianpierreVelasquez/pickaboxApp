import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverOrderPageRoutingModule } from './deliver-order-routing.module';

import { DeliverOrderPage } from './deliver-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverOrderPageRoutingModule
  ],
  declarations: [DeliverOrderPage]
})
export class DeliverOrderPageModule {}
