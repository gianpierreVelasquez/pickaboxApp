import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormProvider {

  constructor() { }

  public loginFrm(): FormGroup {
    return new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  public prepareFrm(): FormGroup {
    return new FormGroup({
      'deliveryPersonId': new FormControl(''),
      'searchText': new FormControl('')
    });
  }

  public productFrm(): FormGroup {
    return new FormGroup({
      'products': new FormArray([])
    });
  }

  public responseFrm(quantity: number): FormGroup {
    return new FormGroup({
      'response': new FormControl('', [Validators.required, Validators.min(quantity), Validators.max(quantity)])
    })
  }

}
