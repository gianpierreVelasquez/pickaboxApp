import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { PrepareItemComponent } from "./prepare-item/prepare-item.component";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        PrepareItemComponent
    ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        PrepareItemComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class ComponentsModule {}