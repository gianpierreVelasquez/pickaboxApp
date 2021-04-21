import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private readonly _generalServ: GeneralService
  ) { }

  getSession(key: string): any {
    const stringified = sessionStorage.getItem(key);
    if (stringified) {
      const json = JSON.parse(stringified);
      return json.data;
    }
    return stringified;
  }

  setSession(key: string, value: any): any {
    return sessionStorage.setItem(key, JSON.stringify({ data: value }));
  }

  isLoggedIn() {
    if (sessionStorage.getItem(environment.KEYS.TOKEN)) {
      return true;
    } else {
      return false;
    }
  }

  removeSession(key: string): any {
    sessionStorage.removeItem(key);
  }

  closeSession() {
    sessionStorage.removeItem(environment.KEYS.TOKEN);
    sessionStorage.removeItem(environment.KEYS.USER);
    this._generalServ.route('/');
  }
}
