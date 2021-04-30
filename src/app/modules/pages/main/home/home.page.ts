import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { SessionService } from 'src/app/core/services/session.service';
import { HomeMenuComponent } from 'src/app/shared/components/popoverComps/home-menu/home-menu.component';
import { OptionTypes } from 'src/app/shared/enum/option-type.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader, OptionProps } from 'src/app/shared/models/general.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import { _mapUser } from 'src/app/shared/utils/general.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  headerSettings: IHeader;

  optionList: OptionProps[];

  user: IUser;
  userlbl = GeneralLang.Labels.User;
  activeUser: string;
  isAllowed: boolean;

  constructor(
    private readonly _generalServ: GeneralService,
    private readonly _session: SessionService
  ) { }

  ngOnInit(): void {
    this._initValues();
    this.user = this._session.getSession(environment.KEYS.USER);
    this.optionList = this._generalServ.menuByProfile(this.user.profile);
  }

  routeTo(path:string): void {
    this._generalServ.route(path);
  }

  openMenu($event): void {
    this._generalServ.showPopover($event, HomeMenuComponent);
  }

  _initValues(): void {
    this.headerSettings = {
      title: 'Menú Principal',
      hasSubtitle: false,
      back: {
        status: false
      },
      extra: {
        status: true,
        icon: 'ellipsis-vertical'
      }
    }
    let userF = this._session.getSession(environment.KEYS.USER);
    this.activeUser = `${GeneralLang.Labels.User} ${_mapUser(userF).userFullDescription}`;
  } 
}
