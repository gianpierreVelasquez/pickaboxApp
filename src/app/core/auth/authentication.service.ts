import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralService } from '../services/general.service';
import { ServicePath } from 'src/app/shared/enum/service-path.enum';
import { IUAuth, IUser } from 'src/app/shared/models/user.interface';
import { SessionService } from '../services/session.service';
import { SPINNER } from 'src/app/shared/enum/spinner.enum';
import { FormGroup } from '@angular/forms';
import { GeneralLang } from 'src/app/shared/lang/general.lang';

export interface IAuthResponse {
  tokens: IToken,
  user: IUser,
}

export interface IToken {
  idToken: string,
  accessToken: string,
  refreshToken: string
}

const URL = environment.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _rootEntity = ServicePath;

  constructor(
    private readonly _http: HttpClient,
    private readonly _generalServ: GeneralService,
    private readonly _session: SessionService
  ) { }

  authRefresh() {
    const bodyReq = {
      email: this._session.getSession(environment.KEYS.USER).email,
      refreshToken: this._session.getSession(environment.KEYS.TOKEN).refreshToken
    }
    return new Promise(resolve => {
      this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });

      this._http.post(`${URL + this._rootEntity.AUTHENTICATION}/refresh`, JSON.stringify(bodyReq)).toPromise()
        .then((resp: any) => {
          if (resp) {
            var newToken = {
              accessToken: resp.accessToken,
              idToken: resp.idToken,
              refreshToken: this._session.getSession(environment.KEYS.TOKEN).refreshToken
            }
            this._session.removeSession(environment.KEYS.TOKEN);
            this._session.setSession(environment.KEYS.TOKEN, newToken);
          }
        })
        .catch(err => {
          this._generalServ.stopLoading();
          this._generalServ.showToastWarning(GeneralLang.Title.Warning, err.error.message);
          resolve(false);
        })
    });
  }

  authVerification(userAuth: IUAuth, frm: FormGroup) {
    var userAuthentication: IUAuth;

    userAuthentication = {
      email: userAuth.email,
      password: userAuth.password
    }

    return new Promise(resolve => {
      this._generalServ.showLoading({ spinner: SPINNER.CRESCENT });
      this._http.post<IAuthResponse>(`${URL + this._rootEntity.AUTHENTICATION}/login`, JSON.stringify(userAuthentication)).toPromise()
        .then(resp => {
          if (resp) {
            this._session.setSession(environment.KEYS.TOKEN, resp.tokens);
            this._session.setSession(environment.KEYS.USER, resp.user);
            this._generalServ.setUser(resp.user);

            this._generalServ.showToastSuccess("Bienvenido al sistema");

            this._generalServ.route('/main/home');
            this._generalServ.stopLoading();
            frm.reset();
          }
        })
        .catch(err => {
          this._generalServ.stopLoading();
          this._generalServ.showToastWarning(GeneralLang.Title.Warning, err.error.message);
          frm.reset();
          resolve(false);
        })
    });
  }
}
