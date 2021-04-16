import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepareOrderPageRoutingModule } from './prepare-order-routing.module';

import { PrepareOrderPage } from './prepare-order.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrepareOrderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PrepareOrderPage]
})
export class PrepareOrderPageModule {}
