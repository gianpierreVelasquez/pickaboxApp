import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SessionService } from 'src/app/core/services/session.service';
import { STATUS } from 'src/app/shared/enum/option-type.enum';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader } from 'src/app/shared/models/general.interface';
import { IDelivery } from 'src/app/shared/models/order.interface';
import { ReqQueryGetDeliveryPersonsDetail } from 'src/app/shared/models/rest.model';
import { _mapUser } from 'src/app/shared/utils/general.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deliver-order',
  templateUrl: './deliver-order.page.html',
  styleUrls: ['./deliver-order.page.scss'],
})
export class DeliverOrderPage implements OnInit {

  deliveryForm: FormGroup;
  headerSettings: IHeader;
  dateList: any[] = [];
  deliveryList: IDelivery[] = [];

  selectedDate: string;
  missingParameter = GeneralLang.Text.MissingDateParam;
  refreshOrder = GeneralLang.Text.RefreshOrders;
  activeUser: string;
  lang = GeneralLang;
  type = STATUS.DELIVERY;

  constructor(
    private readonly _frmProvider: FormProvider,
    private readonly _restServ: RestService,
    private readonly _generalServ: GeneralService,
    private readonly _session: SessionService,
    private readonly _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  selectDate(ev: any): void {
    this.selectedDate = ev.detail.value;
    this.getDeliveryPersonsDetailList(null);
  }

  getDateList() {
    var nowDate = new Date();
    var pastDate = new Date(new Date().setDate(new Date().getDate() - 7));

    while (pastDate < nowDate) {
      pastDate.setDate(pastDate.getDate() + 1);
      this.dateList.push(this._datePipe.transform(new Date(pastDate), 'dd/MM/yyyy'))
    }
  }

  getDeliveryPersonsDetailList(ev?: any) {
    this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });

    let queryReq: ReqQueryGetDeliveryPersonsDetail = {
      deliveryDate: this.selectedDate
    };

    this._restServ.getDeliveryPersonsDetail(queryReq).toPromise()
      .then((res) => {
        if (res) {
          this.deliveryList = res;
          this._generalServ.stopLoading();
          ev.target.complete();
        }
      })
      .catch(err => {
        console.error(err);
        this._generalServ.stopLoading();
        ev.target.complete();
      })
  }

  _initValues(): void {
    this.deliveryForm = this._frmProvider.deliveryFrm();
    this.headerSettings = {
      title: 'Entregar',
      hasSubtitle: false,
      back: {
        status: true,
        back: true,
        icon: 'home'
      },
      extra: {
        status: false
      }
    }
    let userF = this._session.getSession(environment.KEYS.USER);
    this.activeUser = `${GeneralLang.Labels.User} ${_mapUser(userF).userFullDescription}`;
    this.getDateList();
  }

}
