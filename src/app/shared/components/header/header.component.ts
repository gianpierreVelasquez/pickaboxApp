import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/core/services/general.service';
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
  headerSub: Subscription;
  @Output() extraBtnAction: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly _location: Location,
    private readonly _generalServ: GeneralService,
    private readonly _headerHelperServ: HeaderHelperService
  ) { }

  ngOnInit() {
    this._initValues()
  }

  action($event): void {
    this.extraBtnAction.emit($event)
  }

  _initValues(): void {
    this.headerSub = this._headerHelperServ.get().subscribe((res: IHeader) => {
    this.header = res },
    (err) => { console.error(err) },
    () => this.headerSub.unsubscribe());
  }

  back(routeBack?:string): void {
    if(routeBack) {
      this._generalServ.route(routeBack)
    } else {
      this._location.back();
    }
  }

}
