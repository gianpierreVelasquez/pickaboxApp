import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SessionService } from 'src/app/core/services/session.service';
import { STATUS, StatusTypes } from 'src/app/shared/enum/option-type.enum';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader } from 'src/app/shared/models/general.interface';
import { IMonitor, IMonitorDetail, IMonitorTotal } from 'src/app/shared/models/order.interface';
import { ReqQueryGetMonitor } from 'src/app/shared/models/rest.model';
import { _mapUser } from 'src/app/shared/utils/general.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
})
export class MonitorPage implements OnInit, OnDestroy {

  monitorForm: FormGroup;
  headerSettings: IHeader;
  dateList: any[] = [];
  monitorList: IMonitorDetail[] = [];
  monitorTotal: IMonitorTotal[] = [];

  selectedDate: string;
  missingParameter = GeneralLang.Text.MissingDateParam;
  activeUser: string;
  lang = GeneralLang;

  type = STATUS.MONITOR;

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

  ngOnDestroy(): void {
    this.selectedDate = '';
    this.monitorList = [];
  }

  selectDate(ev: any): void {
    this.selectedDate = ev.detail.value;
    this.getMonitorList();
  }

  getDateList() {
    var nowDate = new Date();
    var pastDate = new Date(new Date().setDate(new Date().getDate() - 20));

    while (pastDate < nowDate) {
      pastDate.setDate(pastDate.getDate() + 1);
      this.dateList.push(this._datePipe.transform(new Date(pastDate), 'dd/MM/yyyy'))
    }
  }

  getMonitorList() {
    this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });

    let queryReq: ReqQueryGetMonitor = {
      deliveryDate: this.selectedDate
    };

    this._restServ.getMonitor(queryReq).toPromise()
      .then((res: IMonitor) => {
        if (res) {
          this.monitorList = res.data;
          this.monitorTotal = res.total;
          this._generalServ.stopLoading();
        }
      })
      .catch(err => {
        console.error(err);
        this._generalServ.stopLoading();
      })
  }

  getClassByStatus(status: string): string {
    switch (status) {
      case StatusTypes.DISPONIBLE:
        return 'h-bc--red'
        break;
      case StatusTypes.EN_PREPARACION:
        return 'h-bc--blue'
        break;
      case StatusTypes.PREPARADO:
        return 'h-bc--blue'
        break;

      case StatusTypes.EN_VERIFICACION:
        return 'h-bc--yellow'
        break;
      case StatusTypes.VERIFICADO:
        return 'h-bc--yellow'
        break;
      default:
        return 'h-bc--green'
        break;
    }
  }

  _initValues(): void {
    this.monitorForm = this._frmProvider.monitorFrm();
    this.headerSettings = {
      title: 'Monitor',
      hasSubtitle: false,
      back: {
        status: true,
        icon: 'home',
        back: true
      },
      extra: {
        status: true,
        icon: 'refresh'
      }
    }
    let userF = this._session.getSession(environment.KEYS.USER);
    this.activeUser = `${GeneralLang.Labels.User} ${_mapUser(userF).userFullDescription}`;
    this.getDateList();
  }

}
