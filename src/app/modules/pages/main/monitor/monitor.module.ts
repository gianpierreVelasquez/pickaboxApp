import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorPageRoutingModule } from './monitor-routing.module';

import { MonitorPage } from './monitor.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorPageRoutingModule,
    ComponentsModule,
    TooltipsModule.forRoot()
  ],
  declarations: [MonitorPage]
})
export class MonitorPageModule {}
