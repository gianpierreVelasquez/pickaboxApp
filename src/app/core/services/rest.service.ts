import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicePath } from 'src/app/shared/enum/service-path.enum';
import { IMonitor, IOrder, IQr, IRoute } from 'src/app/shared/models/order.interface';
import { 
  ReqBodyPostPackagesToGetQR, 
  ReqBodyUpdateOrderDetail, 
  ReqBodyUpdateOrderStatusInit, 
  ReqBodyUpdateOrderStatusMiddle, 
  ReqQueryGetMonitor, 
  ReqQueryGetOrders 
} from 'src/app/shared/models/rest.model';
import { environment } from 'src/environments/environment';

const URL = environment.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private readonly _rootEntity = ServicePath;

  constructor(
    private readonly _http: HttpClient
  ) { }

  // PREPARE ORDER
  public getRoutes(): Observable<any> {
    return this._http.get<IRoute>(`${URL + this._rootEntity.ORDER}/delivery-person`)
  }

  public getOrders(queryReq: ReqQueryGetOrders): Observable<any> {
    return this._http.get<IOrder>(`${URL + this._rootEntity.ORDER}`, { params: { ...ReqQueryGetOrders.create(queryReq) } })
  }

  // Request body para estados 1, 2, 4 (Disponible, En preparación, En verificación)
  public updateOrderStatusInit(bodyReq: ReqBodyUpdateOrderStatusInit): Observable<any> {
    return this._http.post<IOrder>(`${URL + this._rootEntity.ORDER}/status`, ReqBodyUpdateOrderStatusInit.create(bodyReq), {})
  }

  // Request body para estados 3, 5, 6 (Preparado, Verificado, Entregado)
  public updateOrderStatusMiddle(bodyReq: ReqBodyUpdateOrderStatusMiddle): Observable<any> {
    return this._http.post<IOrder>(`${URL + this._rootEntity.ORDER}/status`, ReqBodyUpdateOrderStatusMiddle.create(bodyReq), {})
  }

  public updateOrderDetail(bodyReq: ReqBodyUpdateOrderDetail): Observable<any> {
    return this._http.post<IOrder>(`${URL + this._rootEntity.ORDER}/detail`, ReqBodyUpdateOrderDetail.create(bodyReq), {})
  }

  public postPackagesToGetQR(bodyReq: ReqBodyPostPackagesToGetQR): Observable<any> {
    return this._http.post<IQr>(`${URL + this._rootEntity.ORDER}/label`, ReqBodyPostPackagesToGetQR.create(bodyReq), {})
  }

  public getMonitor(queryReq: ReqQueryGetMonitor): Observable<any> {
    return this._http.get<IMonitor>(`${URL + this._rootEntity.ORDER}/monitor`, { params: { ...ReqQueryGetMonitor.create(queryReq) }})
  }
}
