import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  logo = LOGO_ICON;
  appName = environment.app_name;
  btnSignin = GeneralLang.Buttons.Signin;
  btnSignup = GeneralLang.Buttons.Signup;
  btnForgotPass = GeneralLang.Buttons.ForgotPass;

  validations = VALIDATIONS;

  loginForm: FormGroup;

  constructor(
    private readonly _formProvider: FormProvider,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit() {
    this._initValues();
  }

  login(): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    } else {
      this.toRoute('/main/home');
      this._generalServ.showToastSuccess('Hola, Jorge', 'Bienvenido');
    }
  }

  toRoute(path: string): void {
    this._generalServ.route(path);
  }

  _initValues(): void {
    this.loginForm = this._formProvider.loginForm();
  }

}
