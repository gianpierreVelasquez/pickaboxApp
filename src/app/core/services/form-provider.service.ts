import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormProvider {

  constructor() { }

  public loginFrm(): FormGroup {
    return new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  public prepareFrm(): FormGroup {
    return new FormGroup({
      'route': new FormControl(''),
      'searchText': new FormControl('')
    });
  }

}
