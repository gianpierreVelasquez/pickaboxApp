import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { ROL } from 'src/app/shared/enum/form-validation.enum';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { ILoader } from 'src/app/shared/models/general.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import { _mapUser } from 'src/app/shared/utils/general.util';
import { File } from '@ionic-native/file/ngx';
import { GeneralLang } from 'src/app/shared/lang/general.lang';

export interface IFunction {
  (): void;
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  // For Alert, toast, Popover, action sheet
  public funcConfirmed: Subject<boolean> = new Subject<boolean>();

  // For alert with input
  public inputAlertDataGetter: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public user: BehaviorSubject<IUser> = new BehaviorSubject({} as IUser);
  public actualUser: any;

  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _toastCtrl: ToastController,
    private readonly _loadingCtrl: LoadingController,
    private readonly _popoverCtrl: PopoverController,
    private readonly _modalCtrl: ModalController,
    private readonly _alertCtrl: AlertController,
    private readonly _file: File
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

  public getBack(): void {
    this._location.back()
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
        color: "dark",
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

  async showToastWarning(header: string, message: string) {
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

  async showToastError(toastId: string, message: string, btnText: string, header?: string, func?: Function) {
    const toast = await this._toastCtrl.create(
      {
        id: toastId,
        header: header,
        message: message,
        position: 'bottom',
        color: "danger",
        cssClass: "g-toast",
        buttons: [
          {
            text: btnText,
            side: 'end',
            role: 'cancel',
            handler: () => {
              func();
              toast.dismiss();
            }
          }
        ]
      }
    );
    await toast.present();
  }

  // alert
  async presentSimpleAlert(alertId: string, header: string, message: string, btnConfirmText: string, func?: Function, cssStyle?: string) {
    const alert = await this._alertCtrl.create({
      id: alertId,
      header: header,
      message: message,
      backdropDismiss: false,
      cssClass: cssStyle,
      buttons: [
        {
          text: btnConfirmText,
          handler: () => {
            func();
            alert.dismiss();
          }
        }
      ]
    });
    await alert.present()
  }

  async presentAlertConfirm(alertId: string, header: string, message: string, btnConfirmText: string, btnCancelText: string, func1?: Function, func2?: Function, cssStyle?: string) {
    const alert = await this._alertCtrl.create({
      id: alertId,
      header: header,
      message: message,
      backdropDismiss: false,
      cssClass: cssStyle,
      buttons: [
        {
          text: btnCancelText,
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: btnConfirmText,
          role: 'action',
          handler: () => {
            func1();
          }
        }
      ]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role === ROL.ACTION) {
      this.funcConfirmed.next(true);
    } else {
      this.funcConfirmed.next(false);
    }
  }

  async presentAlertInputs(alertId: string, header: string, message: string, inputConf: any, btnConfirmText: string, btnCancelText: string, func1?: Function, func2?: Function, cssStyle?: string) {
    const alert = await this._alertCtrl.create({
      id: alertId,
      header: header,
      message: message,
      backdropDismiss: false,
      cssClass: cssStyle,
      inputs: inputConf,
      buttons: [
        {
          text: btnCancelText,
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: btnConfirmText,
          role: 'action',
          handler: (data) => {
            inputConf.forEach(e => {
              this.inputAlertDataGetter.next([data[e.name]])
            });
          }
        }
      ]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role === ROL.ACTION) {
      this.funcConfirmed.next(true);
    } else {
      this.funcConfirmed.next(false);
    }
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

  // modal
  async showModal(modalId: string, component: Function, componentProps?: any, cssStyle?: string) {
    const modal = await this._modalCtrl.create({
      id: modalId,
      component: component,
      componentProps: componentProps,
      showBackdrop: true,
      cssClass: cssStyle,
      backdropDismiss: false
    });
    return await modal.present();
  }

  async closeModal(modalId) {
    this._modalCtrl.dismiss(modalId);
  }

  // file controller
  async writeFile(filename: string, imgFile: any, path?: string) {
    this.showLoading({spinner: SPINNER.CRESCENT});
    var documentPath = this._file.documentsDirectory;
    return new Promise((resolve, reject) => {
      this._file.writeFile(path ? path : documentPath, filename, imgFile)
        .then(() => {
          this.stopLoading();
          resolve(path+filename);
        })
        .catch((err) => {
          this.stopLoading();
          console.error(err);
          reject(false)
          this.showToastWarning(GeneralLang.Title.Warning, GeneralLang.Messages.CantSaveImage)
        })
    })
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
