import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SessionService } from '../services/session.service';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { AuthenticationService, IToken } from '../auth/authentication.service';
import { GeneralLang } from 'src/app/shared/lang/general.lang';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly _session: SessionService,
    private readonly _authServ: AuthenticationService,
    private readonly _generalServ: GeneralService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: IToken = this._session.getSession(environment.KEYS.TOKEN);
    let request = req;
    if (token) {
      request = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token.accessToken}`)
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._generalServ.presentAlertConfirm('refresh_session',
            GeneralLang.Title.ExpiratedSession,
            GeneralLang.Messages.ExpirateSessionMessage,
            GeneralLang.Buttons.Continue,
            GeneralLang.Buttons.Exit,
            this._authServ.authRefresh.bind(this))

          this._generalServ.funcConfirmed.subscribe(c => {
            if (c === true) {
              this._generalServ.route('/main/home')
            } else {
              this._session.closeSession();
              this._generalServ.route('/auth/signin')
            }
          })
        }
        return throwError(err);

      })
    );
  }
}