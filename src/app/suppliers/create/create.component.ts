import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [
  ]
})
export class CreateSupplierComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private suppliersService: SuppliersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cnpj: '',
      name: '',
      phone: '',
      email: '',
      address: this.formBuilder.group({
        street: '',
        number: '',
        complement: '',
        cep: '',
        district: '',
        city: '',
        state: '',
      })
    })
  }

  submit(): void {
    const body = this.form.getRawValue()
    body.address.number = Number.parseInt(body.address.number)

    this.suppliersService.createSupplier(body)
      .subscribe(
        (res: any) => {
          this.router.navigate(['/suppliers'])
        },
        error => console.log(error)
      )
  }
}
