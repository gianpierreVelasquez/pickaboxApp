import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormProvider {

  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  loginForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

}
