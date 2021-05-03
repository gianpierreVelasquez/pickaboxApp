import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { RestService } from 'src/app/core/services/rest.service';
import { SessionService } from 'src/app/core/services/session.service';
import { StatusTypes } from 'src/app/shared/enum/option-type.enum';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { IColSupport, IHeader } from 'src/app/shared/models/general.interface';
import { IDelivery, IOrder, IOrderDetail } from 'src/app/shared/models/order.interface';
import { ReqBodyUpdateOrderStatusMiddle, ReqQueryGetOrders } from 'src/app/shared/models/rest.model';
import { IUser } from 'src/app/shared/models/user.interface';
import { reportHeader } from 'src/app/shared/utils/default-props';
import { PDF_ICON } from 'src/app/shared/utils/resources.path';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  @Input() delivery: IDelivery;
  @Input() signature: any;
  @Input() modalId: string;
  
  headerReport: IColSupport[];
  orderList: IOrder[];

  headerSettings: IHeader;
  deliveryPersonId: string;
  lang = GeneralLang;

  mergedMaterialList: IOrderDetail[] = [];
  headers = reportHeader;
  icon = PDF_ICON;
  totalMaterialQuantity: number = 0;
  deliveryDate: any;

  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;

  allFinished: boolean = false;
  selectedOrder: IOrder;

  constructor(
    private readonly _generalServ: GeneralService,
    private readonly _restServ: RestService,
    private readonly _session: SessionService,
    private readonly _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  onClose(): void {
    this._generalServ.closeModal(this.modalId);
    this._generalServ.route('/main/deliver-order');
  }

  makeReport(delivery: IDelivery, order: IOrder): void {
    this.headerReport = [
      {
        label: GeneralLang.Labels.BranchOffice,
        data: order.dc,
        type: 'row'
      },
      {
        label: GeneralLang.Labels.OrderItem,
        data: order.orderNumber,
        type: 'row'
      },
      {
        label: GeneralLang.Labels.DeliverItem,
        data: order.orderId,
        type: 'row'
      },
      {
        label: GeneralLang.Labels.TotalPackages,
        data: order.totalPackages,
        type: 'row'
      },
      {
        label: GeneralLang.Labels.DateOrder,
        data: order.orderDate,
        type: 'row'
      },
      {
        label: GeneralLang.Labels.DeliveryRoute,
        data: delivery.deliveryPersonId,
        type: 'row'
      },
      {
        label: GeneralLang.Labels.SendTo,
        data: order.customerAddress,
        type: 'textarea'
      }
    ]

    for (let i = 0; i < order.detail.length; i++) {
      let detail: any[] = order[i].detail;
      detail.forEach(e => {
        this.totalMaterialQuantity += e.pickedQ;
      });
    }
  }

  getOrdersBydeliveryPersonId() {
    this._generalServ.showLoading({spinner: SPINNER.CRESCENT})

    const queryReq: ReqQueryGetOrders = {
      deliveryPersonId: this.delivery.deliveryPersonId,
      status: StatusTypes.VERIFICADO
    }

    this._restServ.getOrders(queryReq).toPromise()
    .then(async (res: IOrder[])  => {
      if(res) {
        this.orderList = res;
        this._generalServ.stopLoading();
        this.updateOrdersToDeliverStatus(res);
      } else {
        this._generalServ.stopLoading();
        this._generalServ.showToastWarning(GeneralLang.Title.Warning, GeneralLang.Messages.ErrorOnProcess);
      }
    })
    .catch(err => {
      console.error(err);
      this._generalServ.stopLoading();
    })
  }

  updateOrdersToDeliverStatus(data: IOrder[]): void {
    this._generalServ.showLoading({spinner: SPINNER.CRESCENT})

    let userData: IUser = this._session.getSession(environment.KEYS.USER);

    for (let i = 0; i < data.length; i++) {
      const order = data[i];

      const reqBody: ReqBodyUpdateOrderStatusMiddle = {
        id: order.id,
        status: StatusTypes.ENTREGADO,
        code: userData.code,
        username: userData.email,
        start: order.updateTime,
        end: new Date().getTime()
      }
  
      this._restServ.updateOrderStatusMiddle(reqBody).toPromise()
      .then(async (res) => {
        if(res) {
          this._generalServ.stopLoading();
          this._generalServ.showToastSuccess(GeneralLang.Messages.OrdersDelivered, GeneralLang.Title.Note);
          this.allFinished = true;
        } else {
          this._generalServ.stopLoading();
          this._generalServ.showToastWarning(GeneralLang.Title.Warning, GeneralLang.Messages.ErrorOnProcess);
          this.allFinished = true;
        }
      })
      .catch(err => { console.error(err) })
    }
  }

  selectOrder(order:IOrder) {
    this.selectedOrder = order;
    this.makeReport(this.delivery, this.selectedOrder);
  }

  hideReport() {
    this.selectedOrder = null;
  }

  _initValues(): void {
    this.headerSettings = {
      title: GeneralLang.Title.Report,
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
    this.deliveryPersonId = this.delivery.deliveryPersonId;
    this.getOrdersBydeliveryPersonId();
    this.deliveryDate = this._datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

}
