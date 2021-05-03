import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _plt: Platform
  ) {}

  ngOnInit(): void {
    this._initializeApp();
  }

  _initializeApp(): void {
    this._plt.backButton.subscribeWithPriority(10, () => {
      //nothing
    })
  }
  
}
