import { Component, OnInit } from '@angular/core';
import { HeaderHelperService } from 'src/app/core/services/header-helper.service';
import { IUser } from 'src/app/shared/models/user.interface';
import { GeneralLang } from 'src/app/shared/lang/general.lang';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  user: IUser;
  userlbl = GeneralLang.Labels.User;

  constructor(
    private readonly _headerHelperServ: HeaderHelperService
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
