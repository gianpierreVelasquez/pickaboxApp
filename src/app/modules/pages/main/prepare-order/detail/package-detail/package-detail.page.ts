import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SessionService } from 'src/app/core/services/session.service';
import { StatusTypes } from 'src/app/shared/enum/option-type.enum';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IOrder, IPackageDetail, IPackageManagement } from 'src/app/shared/models/order.interface';
import { ReqBodyUpdateOrderStatusMiddle } from 'src/app/shared/models/rest.model';
import { IUser } from 'src/app/shared/models/user.interface';
import { packageList } from 'src/app/shared/utils/default-props';
import { _mapPackageType } from 'src/app/shared/utils/general.util';
import { VALIDATIONS } from 'src/app/shared/utils/validators';
import { environment } from 'src/environments/environment';
import { QrViewPage } from '../qr-view/qr-view.page';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.page.html',
  styleUrls: ['./package-detail.page.scss'],
})
export class PackageDetailPage implements OnInit {

  packageSelectorForm: FormGroup;
  packagesForm: FormGroup;
  packageManagement: IPackageManagement[];
  totalPackages: number = 0;
  containerList = packageList;
  containerListForm: IPackageDetail[];

  @Input() modalId: any;
  @Input() order: any;

  protected packageTitle: string = GeneralLang.Title.Packages;
  protected btnFinishPreparation: string = GeneralLang.Buttons.FinishPreparation;

  validations = VALIDATIONS;
  counter = 1;
  lang = GeneralLang;

  constructor(
    private readonly _generalServ: GeneralService,
    private readonly _frmProvider: FormProvider,
    private readonly _formBuilder: FormBuilder,
    private readonly _restServ: RestService,
    private readonly _session: SessionService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  onClose(): void {
    this._generalServ.closeModal(this.modalId);
  }

  // Dynamic package list
  // get p() { return this.packagesForm.controls };
  // get c() { return this.p.labels as FormArray };

  // addContainer() {
  //   this.c.push(this._formBuilder.group({
  //     containerId: [this.counter, [Validators.required]],
  //     containerText: ['', [Validators.required, Validators.minLength(3)]],
  //     quantity: [0, [Validators.required, Validators.min(1)]]
  //   }));
  //   this.counter++;
  // }

  // removeContainer(i) {
  //   this.c.removeAt(i);
  //   this.counter--;
  // }

  makePackageForm(value: any): void {
    if (this.packagesForm.invalid) {
      this.packagesForm.markAllAsTouched();
      this._generalServ.showToastWarning(GeneralLang.Title.Warning, GeneralLang.Messages.MakeASelection)
    } else {
      this.containerListForm = this.containerList.filter(a => value.selector.some(b => a.containerId === b));
      this.addContainer();
    }
  }

  get p() { return this.packagesForm.controls };
  get c() { return this.p.labels as FormArray };

  addContainer() {
    for (let i = this.c.length; i < this.containerListForm.length; i++) {
      this.c.push(this._formBuilder.group({
        containerId: [this.containerListForm[i].containerId, [Validators.required]],
        containerText: [{value: this.containerListForm[i].containerText, disabled: true}, [Validators.required, Validators.minLength(3)]],
        quantity: [this.containerListForm[i].quantity, [Validators.required, Validators.min(1)]]
      }));
    }
  }

  doPackage(value: any): void {
    if (this.packagesForm.invalid) {
      this._generalServ.showToastWarning(GeneralLang.Title.Warning, GeneralLang.Messages.PackageFormMessage)
    } else {
      console.log(this.packagesForm.getRawValue());
      this.getTotalPackages(this.packagesForm.getRawValue().labels);
      this.createLabels(this.packagesForm.getRawValue().labels)
    }
  }

  createLabels(packagesList: IPackageDetail[]): void {
    this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });

    const bodyReq: IPackageManagement = {
      id: this.order.id,
      labels: packagesList
    }

    this._restServ.postPackagesToGetQR(bodyReq).toPromise()
      .then(async (res) => {
        this._generalServ.stopLoading();
        await this.updateOrderStatus();
        this.onClose();
        await this._generalServ.showModal('qr_modal', QrViewPage, { 'data': res, 'dataModal': 'qr_modal', 'totalPackages': this.totalPackages, 'order': this.order });
      })
      .catch(err => {
        this._generalServ.stopLoading();
        console.error(err);
      })
  }

  async updateOrderStatus() {
    this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });

    let userData: IUser = this._session.getSession(environment.KEYS.USER);

    const bodyReq: ReqBodyUpdateOrderStatusMiddle = {
      id: this.order.id,
      status: StatusTypes.PREPARADO,
      code: userData.code,
      username: userData.email,
      start: this.order.updateTime,
      end: new Date().getTime()
    }

    this._restServ.updateOrderStatusMiddle(bodyReq).toPromise()
      .then(res => {
        this._generalServ.stopLoading();
      })
      .catch(err => {
        this._generalServ.stopLoading();
        console.error(err);
      })
  }

  getTotalPackages(arr: IPackageDetail[]): number {
    arr.forEach(e => {
      this.totalPackages += e.quantity
    });
    return this.totalPackages;
  }

  _initValues(): void {
    this.packageSelectorForm = this._frmProvider.packageSelectorFrm();
    this.packagesForm = this._frmProvider.packageFrm();
    // this.addContainer();
  }

}
