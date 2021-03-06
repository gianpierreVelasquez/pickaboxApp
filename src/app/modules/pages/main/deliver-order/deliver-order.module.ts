import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverOrderPageRoutingModule } from './deliver-order-routing.module';

import { DeliverOrderPage } from './deliver-order.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverOrderPageRoutingModule,
    ComponentsModule,
    TooltipsModule.forRoot()
  ],
  declarations: [DeliverOrderPage]
})
export class DeliverOrderPageModule {}
