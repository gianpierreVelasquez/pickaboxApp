import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './modules/layout/authentication/auth.component';
import { AdminComponent } from './modules/layout/admin/admin.component';
import { TokenInterceptor } from './core/interceptors/tokenInterceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { FilterOrderPipe } from './shared/pipes/filter-order.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    FilterOrderPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule 
  ],
  providers: [
    File,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
