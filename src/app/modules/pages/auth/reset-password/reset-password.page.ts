import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { VALIDATIONS } from 'src/app/shared/utils/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  ttlForgotPassTitle = GeneralLang.Title.ForgotPass;
  txtForgotPassSuggest = GeneralLang.Text.ForgotPass;
  lblEmail = GeneralLang.Labels.Email;
  btnRecoverPass = GeneralLang.Buttons.RecoverPass;

  recoverForm: FormGroup;
  
  validations = VALIDATIONS;

  constructor() {
    this.recoverForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
  }

}
