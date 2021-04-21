import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicePath } from 'src/app/shared/enum/service-path.enum';
import { IOrder, IRoute } from 'src/app/shared/models/order.interface';
import { ReqBodyUpdateOrderStatus, ReqQueryGetOrders } from 'src/app/shared/models/rest.model';
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

  public updateOrderStatus(bodyReq: ReqBodyUpdateOrderStatus): Observable<any> {
    return this._http.post<IOrder>(`${URL + this._rootEntity.ORDER}/status`, ReqBodyUpdateOrderStatus.create(bodyReq), {})
  }
}
