import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { IHeader } from 'src/app/shared/models/general.interface';
import { defaultHeader } from 'src/app/shared/utils/default-props';

@Injectable({
  providedIn: 'root'
})
export class HeaderHelperService {

  public headerConf: BehaviorSubject<IHeader> = new BehaviorSubject<IHeader>(defaultHeader);

  constructor() { }

  get(): BehaviorSubject<IHeader> {
    return this.headerConf;
  }

  set(header: IHeader): void{
    const $timer = timer(0).subscribe(() => {
      this.headerConf.next(header);
      $timer.unsubscribe();
    })
  }

}
