import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackageDetailPageRoutingModule } from './package-detail-routing.module';

import { PackageDetailPage } from './package-detail.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    IonicModule,
    PackageDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PackageDetailPage]
})
export class PackageDetailPageModule {}
