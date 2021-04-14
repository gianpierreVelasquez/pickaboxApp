import { Component, OnInit } from '@angular/core';
import { GeneralLang } from 'src/app/shared/lang/general.lang';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  btnSignup = GeneralLang.Buttons.Signup;

  constructor() { }

  ngOnInit() {
  }

}
