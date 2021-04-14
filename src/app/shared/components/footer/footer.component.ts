import { Component, OnInit } from '@angular/core';
import { GeneralLang } from '../../lang/general.lang';

@Component({
  selector: 'm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  userlbl = GeneralLang.Labels.User;

  constructor() { }

  ngOnInit() {}

}
