import { Component, Input, OnInit } from '@angular/core';
import { _mapUser } from '../../utils/general.util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  @Input() firstSpeech: string;
  @Input() secondCol: boolean;
  @Input() secondSpeech: string;

  constructor( ) { }

  ngOnInit(): void {
  }

}
