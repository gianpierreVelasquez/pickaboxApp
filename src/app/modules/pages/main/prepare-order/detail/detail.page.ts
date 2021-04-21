import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader } from 'src/app/shared/models/general.interface';
import { IOrder } from 'src/app/shared/models/order.interface';

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

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  getFormStatus(ev:any): void {
    if(ev){
      this.checkOrder = false;
    }
  }

  packageOrder(): void {
    this._generalServ.showToastSuccess(`Orden #${this.order.orderNumber} lista para empaquetar`);
  }

  _initValues(): void {
    this.headerSettings = {
      title: 'Preparar',
      hasSubtitle: false,
      back: {
        status: true,
        icon: 'arrow-back'
      },
      extra: {
        status: true,
        icon: 'checkbox',
        text: 'Verificar'
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
