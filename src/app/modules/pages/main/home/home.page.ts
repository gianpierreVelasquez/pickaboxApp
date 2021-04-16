import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { HeaderHelperService } from 'src/app/core/services/header-helper.service';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader, OptionProps } from 'src/app/shared/models/general.interface';
import { IUser } from 'src/app/shared/models/user.interface';

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
      route: '/main/prepare-order'
    },
    {
      id: '002',
      src: './../../assets/images/option-check.png',
      title: 'Verificar',
      route: '/main/check-order'
    },
    {
      id: '003',
      src: './../../assets/images/option-deliver.png',
      title: 'Entregar',
      route: '/main/deliver-order'
    },
    {
      id: '004',
      src: './../../assets/images/option-monitor.png',
      title: 'Monitorear',
      route: '/main/monitor'
    }
  ]

  user: IUser;
  userlbl = GeneralLang.Labels.User;

  constructor(
    private readonly _headerHelperServ: HeaderHelperService,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  async openMenu($event) {

  }

  routeTo(path:string): void {
    this._generalServ.route(path);
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
    this._headerHelperServ.set(this.headerSettings);
  }

}
