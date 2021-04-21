import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { OrderItemComponent } from "./order-item/order-item.component";
import { OrderProductItemComponent } from "./order-product-item/order-product-item.component";
import { InputProductItemComponent } from "./input-product-item/input-product-item.component";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        OrderItemComponent,
        OrderProductItemComponent,
        InputProductItemComponent
    ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        OrderItemComponent,
        OrderProductItemComponent,
        InputProductItemComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class ComponentsModule {}