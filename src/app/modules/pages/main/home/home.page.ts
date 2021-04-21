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

  optionList: OptionProps[] = [
    {
      id: '001',
      src: './../../assets/images/option-prepare.png',
      title: 'Preparar',
      route: '/main/prepare-order',
      type: OptionTypes.PREPARADOR
    },
    {
      id: '002',
      src: './../../assets/images/option-check.png',
      title: 'Verificar',
      route: '/main/check-order',
      type: OptionTypes.VERIFICADOR
    },
    {
      id: '003',
      src: './../../assets/images/option-deliver.png',
      title: 'Entregar',
      route: '/main/deliver-order',
      type: OptionTypes.ENTREGADOR
    },
    {
      id: '004',
      src: './../../assets/images/option-monitor.png',
      title: 'Monitorear',
      route: '/main/monitor',
      type: OptionTypes.ADMIN
    }
  ]

  user: IUser;
  userlbl = GeneralLang.Labels.User;
  activeUser: string;

  constructor(
    private readonly _generalServ: GeneralService,
    private readonly _session: SessionService
  ) { }

  ngOnInit(): void {
    this._initValues();
    this.user = this._session.getSession(environment.KEYS.USER);
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
