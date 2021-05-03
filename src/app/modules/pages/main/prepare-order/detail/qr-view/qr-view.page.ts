import { Component, Input, OnInit } from '@angular/core';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { GeneralService } from 'src/app/core/services/general.service';
import { IOrder } from 'src/app/shared/models/order.interface';
import { IHeader } from 'src/app/shared/models/general.interface';

@Component({
  selector: 'app-qr-view',
  templateUrl: './qr-view.page.html',
  styleUrls: ['./qr-view.page.scss'],
})
export class QrViewPage implements OnInit {

  @Input() dataModal: any;
  @Input() data: any;
  @Input() order: IOrder;
  @Input() totalPackages: number = 0;

  modalId: string;
  qrList: any;
  packagelbl = GeneralLang.Labels.Packages;
  lang = GeneralLang;
  headerSettings: IHeader;

  constructor(
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  close() {
    this._generalServ.closeModal(this.modalId);
    this._generalServ.route('/main/prepare-order');
  }

  _initValues(): void {
    this.headerSettings = {
      title: GeneralLang.Title.QR,
      hasSubtitle: false,
      barColor: 'medium',
      back: {
        status: false
      },
      extra: {
        status: true,
        icon: 'close'
      }
    }
    this.modalId = this.dataModal.modalId;
    this.qrList = Array(this.totalPackages).fill(0).map((x,i)=>i);
  }

}
