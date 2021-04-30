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

  public prepareOrderResponseFrm(quantity: number, position: number): FormGroup {
    return new FormGroup({
      position: new FormControl(position, [Validators.required]),
      pickedQ: new FormControl('', [Validators.required, Validators.min(0), Validators.max(quantity), Validators.pattern("^[0-9]+$")]),
      verifiedQ: new FormControl(0, [Validators.required]),
      deliveredQ: new FormControl(0, [Validators.required])
    })
  }

  public verifyOrderResponseFrm(quantity: number, position: number, pickedQ: number): FormGroup {
    return new FormGroup({
      position: new FormControl(position, [Validators.required]),
      pickedQ: new FormControl(pickedQ, [Validators.required]),
      verifiedQ: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]),
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

  public monitorFrm(): FormGroup {
    return new FormGroup({
      byDate: new FormControl('', [Validators.required])
    })
  }

}
