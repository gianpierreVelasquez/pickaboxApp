import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { VALIDATIONS } from '../../utils/validators';

@Component({
  selector: 'app-input-product-item',
  templateUrl: './input-product-item.component.html',
  styleUrls: ['./input-product-item.component.scss'],
})
export class InputProductItemComponent implements OnInit {

  responseForm: FormGroup;
  @Input() expectedQuantity: number = 0;
  @Input() itemIndex: number;
  @Output() dataGetter: EventEmitter<void> = new EventEmitter();

  validations = VALIDATIONS;

  constructor(
    private readonly _frmProvider: FormProvider,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  setReponse(values): void {
    if(this.responseForm.invalid){
      this.responseForm.markAllAsTouched()
    } else {
      this.dataGetter.emit(values);
      this._generalServ.showToastSuccess('Cantidad ingresada correctamente');
      this._generalServ.disabledFields(this.responseForm);
    }
  }

  _initValues(): void {
    this.responseForm = this._frmProvider.responseFrm(this.expectedQuantity);
  }

}
