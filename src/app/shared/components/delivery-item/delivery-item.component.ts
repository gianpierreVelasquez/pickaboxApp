import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralLang } from '../../lang/general.lang';
import { IDelivery } from '../../models/order.interface';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss'],
})
export class DeliveryItemComponent implements OnInit {

  @Input() deliveryList: IDelivery[] = [];

  lang = GeneralLang;

  constructor(
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void { }

  goToDetail(obj: IDelivery): void {
    if(obj.completed && !obj.finished){
      this._generalServ.routeAndParams('/main/deliver-order/detail', obj)
    } else if(!obj.completed && !obj.finished) {
      this._generalServ.showToastInfo(GeneralLang.Messages.DeliveryNotReady)
    } else if(!obj.completed && obj.finished) {
      this._generalServ.showToastInfo(GeneralLang.Messages.DeliveryReady)
    } else {
      // nothing
    }
  }
}
