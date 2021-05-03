import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SessionService } from 'src/app/core/services/session.service';
import { STATUS, StatusTypes } from 'src/app/shared/enum/option-type.enum';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader, ITab } from 'src/app/shared/models/general.interface';
import { IOrder, IRoute } from 'src/app/shared/models/order.interface';
import { prepareTabs } from 'src/app/shared/utils/default-props';
import { _mapUser } from 'src/app/shared/utils/general.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prepare-order',
  templateUrl: './prepare-order.page.html',
  styleUrls: ['./prepare-order.page.scss'],
})
export class PrepareOrderPage implements OnInit {

  prepareForm: FormGroup;
  headerSettings: IHeader;
  tabList: ITab[] = prepareTabs;
  routes: IRoute[] = [];
  orders: IOrder[] = [];

  selectedRoute: string;
  selectedStatus: string;
  missingParameter = GeneralLang.Text.MissingParam;
  refreshOrder = GeneralLang.Text.RefreshOrders;
  activeUser: string;
  lang = GeneralLang;
  filter: any;
  type = STATUS.PREPARE;

  constructor(
    private readonly _frmProvider: FormProvider,
    private readonly _restServ: RestService,
    private readonly _generalServ: GeneralService,
    private readonly _session: SessionService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  getRoutes(): void {
    this._generalServ.showLoading({ spinner: SPINNER.CRESCENT })
    this._restServ.getRoutes().toPromise()
      .then(res => {
        this._generalServ.stopLoading();
        if (res) {
          this.routes = res;
          this._generalServ.stopLoading();
        }
      })
      .catch(err => {
        console.error(err);
        this._generalServ.stopLoading();
      })
  }

  getOrders(deliveryPersonId: string, status: string, ev: any): void {
    if(deliveryPersonId) {
      this._generalServ.showLoading({ spinner: SPINNER.CRESCENT })
      
      let bodyReq: any = {
        deliveryPersonId: deliveryPersonId,
        status: status ? status : StatusTypes.DISPONIBLE,
        term: this.prepareForm.controls.term.value
      };
  
      this._restServ.getOrders(bodyReq).toPromise()
        .then(res => {
          if (res) {
            this.orders = res.map(e => ({...e, haveDetail: this._generalServ.haveDetail(this.type, e.status)}));
            this._generalServ.stopLoading();
            ev.target.complete();
          }
        })
        .catch(err => {
          console.error(err);
          this._generalServ.stopLoading();
          ev.target.complete();
        })
    } else {
      this._generalServ.showToastWarning(GeneralLang.Title.Warning, GeneralLang.Messages.MustSelectRoute);
    }
  }

  selectRoute(ev: any): void {
    this.selectedRoute = ev.detail.value;
    this.getOrders(this.selectedRoute, this.selectedStatus, null);
  }

  selectStatus(ev: any): void {
    this.selectedStatus = ev.detail.value;
    if(this.selectedRoute){
      this.getOrders(this.selectedRoute, this.selectedStatus, null);
    } else {
      this._generalServ.showToastWarning(GeneralLang.Title.Warning, GeneralLang.Messages.MustSelectRoute);
    }
  }

  _initValues(): void {
    this.prepareForm = this._frmProvider.prepareFrm();
    this.headerSettings = {
      title: 'Preparar',
      hasSubtitle: false,
      back: {
        status: true,
        icon: 'home',
        back: true,
        routeBack: '/main/home'
      },
      extra: {
        status: false
      }
    }
    this.getRoutes();
    let userF = this._session.getSession(environment.KEYS.USER);
    this.activeUser = `${GeneralLang.Labels.User} ${_mapUser(userF).userFullDescription}`;
  }
}
