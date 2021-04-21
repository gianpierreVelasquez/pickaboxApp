import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { StatusTypes } from '../../enum/option-type.enum';
import { SPINNER } from '../../enum/spinner.enum';
import { GeneralLang } from '../../lang/general.lang';
import { IOrder } from '../../models/order.interface';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {

  @Input() showDetail: boolean = false;
  @Input() orderList: IOrder[] = [];

  orderlbl = GeneralLang.Labels.OrderItem;
  deliverlbl = GeneralLang.Labels.DeliverItem;
  noItems = GeneralLang.Text.NoItems;

  constructor(
    private readonly _generalServ: GeneralService,
    private readonly _restServ: RestService
  ) { }

  ngOnInit() {}

  goToDetail(order: IOrder): void {

    const bodyReq: any = {
      id: order.id,
      status: StatusTypes.EN_PREPARACION
    }

    this._generalServ.showLoading({spinner: SPINNER.CRESCENT});

    this._restServ.updateOrderStatus(bodyReq).toPromise()
      .then(res => {
        this._generalServ.stopLoading();
        this._generalServ.showToastSuccess(`La orden #${res.orderNumber} fue actualizada.`);
        this._generalServ.routeAndParams('/main/prepare-order/detail', res);
      })
      .catch(err => {
        console.error(err);
        this._generalServ.stopLoading();
      })
  }

}
