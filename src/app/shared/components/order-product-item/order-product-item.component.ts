import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { IOrderDetail } from '../../models/order.interface';
import { FORM } from '../../enum/form-validation.enum';

@Component({
  selector: 'app-order-product-item',
  templateUrl: './order-product-item.component.html',
  styleUrls: ['./order-product-item.component.scss'],
})
export class OrderProductItemComponent implements OnInit {

  productForm: FormGroup;

  @Input() productList: IOrderDetail[];
  @Output() getFormStatus: EventEmitter<void> = new EventEmitter();

  checker: boolean = false;
  colorChecker: string = "close-circle";
  iconChecker: string = "danger";
  expectedQuantity: number = 0;

  constructor(
    private readonly _frmProvider: FormProvider,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initValues();
    this.addProducts();

    this.productForm.statusChanges.subscribe(status => {
      if(status === FORM.VALID){
        this.checkOrder(this.productForm.value);
      }
    })
  }

  get c() { return this.productForm.controls; }
  get p() { return this.c.products as FormArray; }

  addProducts() {
    if (this.p.length < this.productList.length) {
      for (let i = this.p.length; i < this.productList.length; i++) {
        this.p.push(this._formBuilder.group({
          itemName: [{value: this.productList[i].materialText, disabled: true}],
          itemId: [{value: this.productList[i].materialId, disabled: true}],
          itemMeasureUnit: [{value: this.productList[i].measureUnit, disabled: true}],
          itemQuantity: [{value: this.productList[i].quantity, disabled: true}],
          itemResponse: ['', [Validators.required]]
        }));
      }
    }
  }

  checkOrder(values){
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      this.getFormStatus.emit(values);
    }
  }

  getResponse(ev:any, i): void {
    console.log(ev);
    console.log(this.p.controls[i]['controls']);
    
    setTimeout(() => {
      this.p.controls[i]['controls'].itemResponse.setValue(ev);
    });
  }

  _initValues(): void {
    this.productForm = this._frmProvider.productFrm();
  }
}
