import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingProvider {
  constructor(private readonly _loadingCtrl: LoadingController) {}

  async show(obj: any) {
    let loader = await this._loadingCtrl.create({
      dismissOnPageChange: true,
      duration: 4000,
      ...obj
    });
    loader.present();
  }

  async dismiss() {
    this._loadingCtrl.dismiss()
  }
}
