import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreatePurchaseComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private purchasesService: PurchasesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      supplierId: '',
      productId: '',
      quantity: '',
      value: ''
    })
  }

  submit(): void {
    let { supplierId, productId, quantity, value } = this.form.getRawValue()
    supplierId = Number.parseInt(supplierId)
    productId = Number.parseInt(productId)
    quantity = Number.parseFloat(quantity)
    value = Number.parseFloat(value)

    const body = { 
      supplierId,
      purchaseitems: [
        {
          productId,
          quantity,
          value
        }
      ]
    }
    this.purchasesService.createPurchase(body)
      .subscribe(
        (res: any) => {
          this.router.navigate(['/purchases'])
        },
        error => console.log(error)
      )
  }

}
