import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { OrderItemComponent } from "./order-item/order-item.component";
import { PrepareOrderProductComponent } from "./prepare-order-product-item/prepare-order-product-item.component";
import { CheckOrderProductItemComponent } from "./check-order-product-item/check-order-product-item.component";
import { InputProductItemComponent } from "./input-product-item/input-product-item.component";
import { MonitorItemComponent } from "./monitor-item/monitor-item.component";
import { DeliveryItemComponent } from "./delivery-item/delivery-item.component";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        OrderItemComponent,
        PrepareOrderProductComponent,
        CheckOrderProductItemComponent,
        InputProductItemComponent,
        MonitorItemComponent,
        DeliveryItemComponent
    ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        OrderItemComponent,
        PrepareOrderProductComponent,
        CheckOrderProductItemComponent,
        InputProductItemComponent,
        MonitorItemComponent,
        DeliveryItemComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class ComponentsModule {}