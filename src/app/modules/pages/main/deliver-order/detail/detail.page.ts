import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GeneralService } from 'src/app/core/services/general.service';

import { SessionService } from 'src/app/core/services/session.service';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IHeader } from 'src/app/shared/models/general.interface';
import { IDelivery } from 'src/app/shared/models/order.interface';
import { _mapUser } from 'src/app/shared/utils/general.util';
import { environment } from 'src/environments/environment';
import { ReportPage } from './report/report.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, AfterViewInit {

  @ViewChild('signCanvas', { static: false }) canvas: any;

  canvasElement: any;
  selectedColor = '#000000';
  lineWidth = 1;
  saveX: number;
  saveY: number;

  headerSettings: IHeader;
  delivery: IDelivery;

  signature: any;
  drawing = false;
  activeUser: string;
  lang = GeneralLang;

  constructor(
    private readonly _plt: Platform,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _session: SessionService,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this._plt.width() + '';
    this.canvasElement.height = 200;
  }

  startDrawing(ev): void {
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  endDrawing(): void {
    this.drawing = false;
    this.saveSign();
  }

  moved(ev): void {
    if (!this.drawing) return;
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');

    let currentX = ev.changedTouches[0].pageX - canvasPosition.x;
    let currentY = ev.changedTouches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  cleanCanvas(): void {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.signature = null;
  }

  saveSign(): void {
    this.signature = this.canvasElement.toDataURL();
  }

  deliverOrder(): void {
    this._generalServ.showModal('report_modal', ReportPage, { 'signature': this.signature, 'modalId': 'report_modal', 'delivery': this.delivery })
  }

  _initValues(): void {
    this.headerSettings = {
      title: 'Entregar',
      hasSubtitle: false,
      back: {
        status: true,
        icon: 'arrow-back',
        back: true
      },
      extra: {
        status: true,
        icon: 'checkmark'
      }
    }
    this._activatedRoute.queryParams.subscribe(() => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.delivery = this._router.getCurrentNavigation().extras.state.params;
      }
    });
    let userF = this._session.getSession(environment.KEYS.USER);
    this.activeUser = `${GeneralLang.Labels.User} ${_mapUser(userF).userFullDescription}`;
  }
}
