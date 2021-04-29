import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SessionService } from 'src/app/core/services/session.service';
import { StatusTypes } from 'src/app/shared/enum/option-type.enum';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader } from 'src/app/shared/models/general.interface';
import { IOrder, IOrderDetail, IOrderManagment } from 'src/app/shared/models/order.interface';
import { ReqBodyUpdateOrderStatusMiddle } from 'src/app/shared/models/rest.model';
import { IUser } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';

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

  preparationList: IOrderDetail[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _generalServ: GeneralService,
    private readonly _restServ: RestService,
    private readonly _session: SessionService
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
    
    const bodyReq: IOrderManagment = {
      id: this.order.id,
      detail: this.preparationList
    }

    this._restServ.updateOrderDetail(bodyReq).toPromise()
      .then(async (res) => {
        this._generalServ.stopLoading();
        await this.verifyOrder();
      })
      .catch(err => {
        console.error(err);
        this._generalServ.stopLoading();
      })
  }

  async verifyOrder() {
    this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });
    
    let userData: IUser = this._session.getSession(environment.KEYS.USER);

    const bodyReq: ReqBodyUpdateOrderStatusMiddle = {
      id: this.order.id,
      status: StatusTypes.VERIFICADO,
      code: userData.code,
      username: userData.email,
      start: this.order.updateTime,
      end: new Date().getTime()
    }

    this._restServ.updateOrderStatusMiddle(bodyReq).toPromise()
      .then(res => {
        this._generalServ.stopLoading();
        this._generalServ.route('/main/check-order');
      })
      .catch(err => {
        this._generalServ.stopLoading();
        console.error(err);
      })
  }

  _initValues(): void {
    this.headerSettings = {
      title: 'Verificar',
      hasSubtitle: false,
      back: {
        status: true,
        icon: 'arrow-back',
        back: true
      },
      extra: {
        status: true,
        icon: 'clipboard'
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
