import { Component, Input, OnInit } from '@angular/core';
import { GeneralLang } from '../../lang/general.lang';
import { IMonitor } from '../../models/order.interface';

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrls: ['./monitor-item.component.scss'],
})
export class MonitorItemComponent implements OnInit {

  @Input() monitorList: IMonitor[] = [];

  noItems = GeneralLang.Text.NoItems;

  constructor() { }

  ngOnInit(): void { }

}
