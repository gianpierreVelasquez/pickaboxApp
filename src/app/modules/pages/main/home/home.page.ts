import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader, OptionProps } from 'src/app/shared/models/general.interface';
import { IUser } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  headerSettings: IHeader = {
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

  optionList: OptionProps[] = [
    {
      id: '001',
      src: './../../assets/images/option-prepare.png',
      title: 'Preparar'
    },
    {
      id: '002',
      src: './../../assets/images/option-check.png',
      title: 'Verificar'
    },
    {
      id: '003',
      src: './../../assets/images/option-deliver.png',
      title: 'Entregar'
    },
    {
      id: '004',
      src: './../../assets/images/option-monitor.png',
      title: 'Monitorear'
    }
  ] 

  user: IUser;
  userlbl = GeneralLang.Labels.User;

  constructor(
    private readonly popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.user = {
      id: '1',
      name: 'Jorge',
      lastname: 'Arredondo',
      code: '30158403'
    }
  }

  async openPopover($event) {

  }

}
