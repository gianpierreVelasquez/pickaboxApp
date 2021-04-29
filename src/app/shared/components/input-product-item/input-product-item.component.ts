import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralLang } from '../../lang/general.lang';
import { VALIDATIONS } from '../../utils/validators';

@Component({
  selector: 'app-input-product-item',
  templateUrl: './input-product-item.component.html',
  styleUrls: ['./input-product-item.component.scss'],
})
export class InputProductItemComponent implements OnInit {

  responseForm: FormGroup;
  @Input() expectedQuantity: number = 0;
  @Input() pickedQuantity: number = 0;
  @Input() itemIndex: number;
  @Input() itemPosition: number;
  @Input() fieldName: string;
  @Output() dataGetter: EventEmitter<any> = new EventEmitter<any>();

  validations = VALIDATIONS;
  submitted = false;

  constructor(
    private readonly _frmProvider: FormProvider,
    private readonly _generalServ: GeneralService
  ) { }

  ngOnInit(): void {
    this._initValues();
  }

  setReponse(values): void {
    if (this.responseForm.invalid) {
      this.responseForm.markAllAsTouched()
    } else {
      var quantityGetted = this.responseForm.controls[this.fieldName].value;
      if (quantityGetted < this.expectedQuantity) {

        this._generalServ.presentAlertConfirm(
          'product-item-insufficient',
          GeneralLang.Title.Important,
          GeneralLang.Messages.LessThanExpectedQuantity,
          GeneralLang.Buttons.Understood,
          GeneralLang.Buttons.Cancel,
          this._generalServ.disabledFields.bind(this, this.responseForm)
        );

        this._generalServ.funcConfirmed.subscribe(c => {
          if (c === true) {
            this.dataGetter.emit(values);
            this.submitted = true;
          }
        })

      } else {
        this.dataGetter.emit(values);
        this.submitted = true;
        this._generalServ.showToastSuccess(GeneralLang.Messages.CorrectQuantity);
        this._generalServ.disabledFields(this.responseForm);
      }
    }
  }

  showInfo(): void {
    this._generalServ.showToastInfo(GeneralLang.Messages.ExpectedQuantity);
  }

  _initValues(): void {
    switch (this.fieldName) {
      case 'pickedQ':
        this.responseForm = this._frmProvider.prepareOrderResponseFrm(this.expectedQuantity, this.itemPosition);
        break;
      case 'verifiedQ':
        this.responseForm = this._frmProvider.verifyOrderResponseFrm(this.expectedQuantity, this.itemPosition, this.pickedQuantity);
        break;
      default:
        break;
    }

  }

}
