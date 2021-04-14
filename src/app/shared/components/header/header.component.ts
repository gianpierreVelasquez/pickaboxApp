import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderHelperService } from 'src/app/core/services/header-helper.service';
import { IHeader } from '../../models/general.interface';
import { defaultHeader } from '../../utils/default-props';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  header: IHeader = defaultHeader;
  headerSubscription: Subscription;
  @Output() extraBtnAction: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly _headerHelperServ: HeaderHelperService
  ) { }

  ngOnInit() {
    this.headerSubscription = this._headerHelperServ.get().subscribe((res: IHeader) => {
      this.header = res;
    })
  }

  action($event): void {
    this.extraBtnAction.emit($event)
  }

}
