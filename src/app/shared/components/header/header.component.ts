import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { IHeader } from '../../models/general.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() headerConf: IHeader;
  @Input() disableBack: boolean = false;
  @Input() disableExtra: boolean = false;
  @Output() backBtnAction: EventEmitter<void> = new EventEmitter();
  @Output() extraBtnAction: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly _location: Location,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void { }

  back(routeBack?:string): void {
    if(routeBack) {
      this._generalServ.route(routeBack)
    } else {
      this._location.back();
    }
  }

  backAction($event): void {
    this.backBtnAction.emit($event);
  }

  extraAction($event): void {
    this.extraBtnAction.emit($event);
  }

}
