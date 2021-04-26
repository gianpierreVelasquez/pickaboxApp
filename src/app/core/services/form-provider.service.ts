import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormProvider {

  constructor() { }

  public loginFrm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public prepareFrm(): FormGroup {
    return new FormGroup({
      deliveryPersonId: new FormControl(''),
      searchText: new FormControl('')
    });
  }

  public productFrm(): FormGroup {
    return new FormGroup({
      detail: new FormArray([])
    });
  }

  public responseFrm(quantity: number, index: number): FormGroup {
    return new FormGroup({
      position: new FormControl(index, [Validators.required]),
      pickedQ: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(quantity)]),
      verifiedQ: new FormControl(0, [Validators.required]),
      deliveredQ: new FormControl(0, [Validators.required])
    })
  }

  public packageSelectorFrm(): FormGroup {
    return new FormGroup({
      selector: new FormControl('', [Validators.required])
    })
  }

  public packageFrm(): FormGroup {
    return new FormGroup({
      labels: new FormArray([])
    })
  }

}
