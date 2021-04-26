import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader } from 'src/app/shared/models/general.interface';
import { IOrder, IPrepareDetail, IPrepareManagment } from 'src/app/shared/models/order.interface';
import { PackageDetailPage } from './package-detail/package-detail.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  headerSettings: IHeader;
  order: IOrder;

  orderId: string;
  orderLength: string;
  checkOrder: boolean = true;

  preparationList: IPrepareDetail[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _generalServ: GeneralService,
    private readonly _restServ: RestService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  getFormStatus(ev: any): void {
    if (ev) {
      this.checkOrder = false;
      Object.assign(this.preparationList, ev);
    }
  }

  packageOrder(): void {
    this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });
    
    const bodyReq: IPrepareManagment = {
      id: this.order.id,
      detail: this.preparationList
    }

    this._restServ.updateOrderDetail(bodyReq).toPromise()
      .then((res) => {
        this._generalServ.stopLoading();
        this._generalServ.showModal('package_modal', PackageDetailPage, { 'order': this.order, 'modalId': 'package_modal' }, 'g-modal--bottom');
      })
      .catch(err => {
        console.error(err);
        this._generalServ.stopLoading();
      })
  }

  _initValues(): void {
    this.headerSettings = {
      title: 'Preparar',
      hasSubtitle: false,
      back: {
        status: true,
        icon: 'arrow-back',
        back: true
      },
      extra: {
        status: true,
        icon: 'archive'
      }
    }

    this._activatedRoute.queryParams.subscribe(() => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.order = this._router.getCurrentNavigation().extras.state.params;
      }
    });

    this.orderId = `${GeneralLang.Labels.Deliver} ${this.order.orderNumber}`
    this.orderLength = `${GeneralLang.Labels.Products} ${this.order.detail.length}`;
  }

}
