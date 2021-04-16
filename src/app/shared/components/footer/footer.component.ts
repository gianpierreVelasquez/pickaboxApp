import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralLang } from '../../lang/general.lang';
import { IUser } from '../../models/user.interface';
import { _mapUser } from '../../utils/general.util';

@Component({
  selector: 'm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  userlbl = GeneralLang.Labels.User;
  user: IUser;
  userSub: Subscription;

  constructor(
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  _initValues(): void {
    this.userSub = this._generalServ.getUser().subscribe((res:IUser) => { 
    this.user = _mapUser(res) }, 
    (err) => { console.error(err) }, 
    () => this.userSub.unsubscribe());
    
  }

}
