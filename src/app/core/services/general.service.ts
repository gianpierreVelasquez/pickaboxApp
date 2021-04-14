import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private readonly _router: Router,
    private readonly _toastCtrl: ToastController,
    private readonly _loadingCtrl: LoadingController
  ) { }

  // router
  public route(path:string): void {
    this._router.navigate([path]);
  }

  public routeAndParams(path:string, params:any): void {
    let extras: NavigationExtras = {
      state: {
        params: params
      }
    };

    this._router.navigate([path], extras);
  }

  // loading
  async showLoading(spinner: any, message?:string) {
    let loader = await this._loadingCtrl.create({
      message: message,
      spinner: spinner
    });

    await loader.present();
  }

  async stopLoading() {
    this._loadingCtrl.dismiss();
  }

  // toast
  async showToastInfo(message?:string, header?:string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom'
      }
    );
    toast.present();
  }

  async showToastSuccess(message?:string, header?:string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom',
        color: "primary"
      }
    );
    toast.present();
  }

  async showToastWarning(message?:string, header?:string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom',
        color: "warning"
      }
    );
    toast.present();
  }

  async showToastError(message?:string, header?:string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom',
        color: "danger"
      }
    );
    toast.present();
  }

}
