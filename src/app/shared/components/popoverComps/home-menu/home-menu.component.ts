import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
})
export class HomeMenuComponent implements OnInit {

  constructor(
    private readonly _generalServ: GeneralService,
    private readonly _session: SessionService
  ) { }

  ngOnInit() {}

  logout() {
    this._generalServ.closePopover();
    this._session.closeSession();
  }

}
