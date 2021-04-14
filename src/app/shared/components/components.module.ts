import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ]
})

export class ComponentsModule {}