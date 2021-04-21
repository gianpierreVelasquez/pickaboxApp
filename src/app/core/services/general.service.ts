import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { ILoader } from 'src/app/shared/models/general.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import { _mapUser } from 'src/app/shared/utils/general.util';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public user: BehaviorSubject<IUser> = new BehaviorSubject({} as IUser);
  public actualUser: any;

  constructor(
    private readonly _router: Router,
    private readonly _toastCtrl: ToastController,
    private readonly _loadingCtrl: LoadingController,
    private readonly _popoverCtrl: PopoverController
  ) { }

  // global variables
  // user
  public getUser(): BehaviorSubject<IUser> {
    return this.user
  }

  public setUser(user: IUser): void {
    setTimeout(() => {
      this.user.next(user);
    }, 100);
  }

  // router
  public route(path: string): void {
    this._router.navigate([path]);
  }

  public routeAndParams(path: string, params: any): void {
    let extras: NavigationExtras = {
      state: {
        params: params
      }
    };

    this._router.navigate([path], extras);
  }

  // loading
  async showLoading(loader?: ILoader) {
    let loading = await this._loadingCtrl.create({
      spinner: loader.spinner ? loader.spinner : SPINNER.CRESCENT,
      cssClass: 'g-loader',
      mode: 'ios'
    });

    await loading.present();
  }

  async stopLoading() {
    this._loadingCtrl.dismiss();
  }

  // toast
  async showToastInfo(message?: string, header?: string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom',
        cssClass: "g-toast"
      }
    );
    await toast.present();
  }

  async showToastSuccess(message?: string, header?: string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom',
        color: "success",
        cssClass: "g-toast"
      }
    );
    await toast.present();
  }

  async showToastWarning(message?: string, header?: string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom',
        color: "warning",
        cssClass: "g-toast"
      }
    );
    await toast.present();
  }

  async showToastError(message?: string, header?: string) {
    const toast = await this._toastCtrl.create(
      {
        header: header,
        message: message,
        duration: 3000,
        position: 'bottom',
        color: "danger",
        cssClass: "g-toast"
      }
    );
    await toast.present();
  }

  // popover
  async showPopover(event: any, component: Function, componentProps?: any) {
    const popover = await this._popoverCtrl.create({
      component: component,
      componentProps: componentProps,
      event: event,
      backdropDismiss: true,
      mode: 'ios'
    });
    await popover.present();
  }

  async closePopover() {
    this._popoverCtrl.dismiss();
  }

  //FormChecker
  disabledFields(group: FormGroup): void {
    Object.keys(group.controls).forEach(key => {
      if (group.controls[key].value != undefined && group.controls[key].value != "" && group.controls[key].invalid == false) {
        group.controls[key].disable();
      }
    });
  }

}
