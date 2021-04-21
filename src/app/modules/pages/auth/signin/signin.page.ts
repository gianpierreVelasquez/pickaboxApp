import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralLang } from 'src/app/shared/lang/general.lang';
import { LOGO_ICON } from 'src/app/shared/utils/resources.path';
import { VALIDATIONS } from 'src/app/shared/utils/validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  loginForm: FormGroup;
  logo = LOGO_ICON;
  appName = environment.app_name;
  btnSignin = GeneralLang.Buttons.Signin;
  btnSignup = GeneralLang.Buttons.Signup;
  btnForgotPass = GeneralLang.Buttons.ForgotPass;

  validations = VALIDATIONS;

  constructor(
    private readonly _frmProvider: FormProvider,
    private readonly _authServ: AuthenticationService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  login(value): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    } else {
      this._authServ.authVerification(value, this.loginForm);
    }
  }

  _initValues(): void {
    this.loginForm = this._frmProvider.loginFrm();
  }

}
