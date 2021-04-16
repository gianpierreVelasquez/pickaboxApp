import { Component, Input, OnInit } from '@angular/core';
import { GeneralLang } from '../../lang/general.lang';
import { IOrder } from '../../models/order.interface';

@Component({
  selector: 'm-prepare-item',
  templateUrl: './prepare-item.component.html',
  styleUrls: ['./prepare-item.component.scss'],
})
export class PrepareItemComponent implements OnInit {

  @Input() showDetail: boolean = false;
  @Input() orderList: IOrder[] = [];

  orderlbl = GeneralLang.Labels.OrderItem;
  deliverlbl = GeneralLang.Labels.DeliverItem;

  constructor() { }

  ngOnInit() {}

}
