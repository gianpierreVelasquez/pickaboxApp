import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { HeaderHelperService } from 'src/app/core/services/header-helper.service';
import { IHeader, ITab } from 'src/app/shared/models/general.interface';
import { IOrder } from 'src/app/shared/models/order.interface';
import { prepareTabs } from 'src/app/shared/utils/default-props';

@Component({
  selector: 'app-prepare-order',
  templateUrl: './prepare-order.page.html',
  styleUrls: ['./prepare-order.page.scss'],
})
export class PrepareOrderPage implements OnInit {

  prepareForm: FormGroup;
  headerSettings: IHeader;
  tabList: ITab[] = prepareTabs;
  orders: IOrder[] = [];

  constructor(
    private readonly _headerHelperServ: HeaderHelperService,
    private readonly _formProvider: FormProvider
  ) { }

  ngOnInit(): void {
    this._initValues();
    this.orders = [
      {
        id: 1,
        orderCode: 321654,
        deliverCode: 321321,
        attendantName: 'GIANPIERRE BRYAN VELASQUEZ PEREZ',
        attendantCode: 74053164
      },
      {
        id: 2,
        orderCode: 321654,
        deliverCode: 321321,
        attendantName: 'GIANPIERRE GIANPIERRE BRYAN VELASQUEZ PEREZ',
        attendantCode: 74053164
      }
    ]
  }

  _initValues(): void {
    this.prepareForm = this._formProvider.prepareFrm();
    this.headerSettings = {
      title: 'Preparar',
      hasSubtitle: false,
      back: {
        status: true,
        icon: 'home'
      },
      extra: {
        status: true,
        icon: 'reload'
      }
    }
    this._headerHelperServ.set(this.headerSettings);
  }
}
