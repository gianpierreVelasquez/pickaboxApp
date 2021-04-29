import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { STATUS, StatusTypes } from '../../enum/option-type.enum';
import { SPINNER } from '../../enum/spinner.enum';
import { GeneralLang } from '../../lang/general.lang';
import { IOrder } from '../../models/order.interface';
import { ReqBodyUpdateOrderStatusInit } from '../../models/rest.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {

  @Input() orderList: IOrder[] = [];
  @Input() type: string;

  orderlbl = GeneralLang.Labels.OrderItem;
  deliverlbl = GeneralLang.Labels.DeliverItem;
  noItems = GeneralLang.Text.NoItems;

  constructor(
    private readonly _generalServ: GeneralService,
    private readonly _restServ: RestService
  ) { }

  ngOnInit(): void { }

  goToDetail(order: IOrder, type: string): void {
    if( type === STATUS.PREPARE && order.status === StatusTypes.DISPONIBLE) {
      const bodyReqDisponible: ReqBodyUpdateOrderStatusInit = {
        id: order.id,
        status: StatusTypes.EN_PREPARACION
      }

      this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });

      this._restServ.updateOrderStatusInit(bodyReqDisponible).toPromise()
        .then(res => {
          this._generalServ.stopLoading();
          this._generalServ.showToastSuccess(`La orden #${res.orderNumber} fue actualizada.`);
          this._generalServ.routeAndParams('/main/prepare-order/detail', res);
        })
        .catch(err => {
          console.error(err);
          this._generalServ.stopLoading();
        });
    }
    else if( type === STATUS.PREPARE && order.status === StatusTypes.EN_PREPARACION) {
      this._generalServ.routeAndParams('/main/prepare-order/detail', order);
    }
    else if( type === STATUS.PREPARE && order.status === StatusTypes.PREPARADO) {
      this._generalServ.showToastInfo(GeneralLang.Messages.OrderReadyToCheck, GeneralLang.Title.Note)
    }
    else if( type === STATUS.VERIFY && order.status === StatusTypes.PREPARADO) {
      const bodyReqEnVerificacion: ReqBodyUpdateOrderStatusInit = {
        id: order.id,
        status: StatusTypes.EN_VERIFICACION
      }

      this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });

      this._restServ.updateOrderStatusInit(bodyReqEnVerificacion).toPromise()
        .then(res => {
          this._generalServ.stopLoading();
          this._generalServ.showToastSuccess(`La orden #${res.orderNumber} fue actualizada.`);
          this._generalServ.routeAndParams('/main/check-order/detail', res);
        })
        .catch(err => {
          console.error(err);
          this._generalServ.stopLoading();
        });
    }
    else if( type === STATUS.VERIFY && order.status === StatusTypes.EN_VERIFICACION) {
      this._generalServ.routeAndParams('/main/check-order/detail', order);
    }
    else if( type === STATUS.VERIFY && order.status === StatusTypes.VERIFICADO) {
     
    } else {
      
    }
  }
}
