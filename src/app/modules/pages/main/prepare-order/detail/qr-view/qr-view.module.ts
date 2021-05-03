import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrViewPageRoutingModule } from './qr-view-routing.module';

import { QrViewPage } from './qr-view.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrViewPageRoutingModule,
    ComponentsModule
  ],
  declarations: [QrViewPage]
})
export class QrViewPageModule {}
