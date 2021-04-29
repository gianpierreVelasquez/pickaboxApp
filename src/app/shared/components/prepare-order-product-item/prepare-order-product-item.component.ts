import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormProvider } from 'src/app/core/services/form-provider.service';
import { IOrderDetail } from '../../models/order.interface';
import { FORM } from '../../enum/form-validation.enum';

@Component({
  selector: 'app-prepare-order-item',
  templateUrl: './prepare-order-product-item.component.html',
  styleUrls: ['./prepare-order-product-item.component.scss'],
})
export class PrepareOrderProductComponent implements OnInit {

  productForm: FormGroup;

  @Input() productList: IOrderDetail[];
  @Output() getFormStatus: EventEmitter<any> = new EventEmitter<any>();

  checker: boolean = false;
  colorChecker: string = "close-circle";
  iconChecker: string = "danger";
  expectedQuantity: number = 0;
  detailOrderArr: any[] = [];

  constructor(
    private readonly _frmProvider: FormProvider,
    private readonly _formBuilder: FormBuilder
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
  get p() { return this.c.detail as FormArray; }

  addProducts() {
    if (this.p.length < this.productList.length) {
      for (let i = this.p.length; i < this.productList.length; i++) {
        this.p.push(this._formBuilder.group({
          itemPosition: [{value: this.productList[i].position, disabled: true}],
          itemId: [{value: this.productList[i].materialId, disabled: true}],
          itemName: [{value: this.productList[i].materialText, disabled: true}],
          itemMeasureUnit: [{value: this.productList[i].measureUnit, disabled: true}],
          itemQuantity: [{value: this.productList[i].quantity, disabled: true}],
          details: ['', [Validators.required]]
        }));
      }
    }
  }

  checkOrder(values:any){
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      let arr: any[] = values.detail
      arr.forEach(e => this.detailOrderArr.push(e.details));
      this.getFormStatus.emit(this.detailOrderArr);
    }
  }

  getResponse(ev:any, i): void {
    setTimeout(() => {
      this.p.controls[i]['controls'].details.setValue(ev);
    });
  }

  _initValues(): void {
    this.productForm = this._frmProvider.productFrm();
  }
}
