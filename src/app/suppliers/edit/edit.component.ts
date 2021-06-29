import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditSupplierComponent implements OnInit {
  form: FormGroup;
  public id: string;

  constructor(
    private formBuilder: FormBuilder,
    private suppliersService: SuppliersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.suppliersService.getSupplierById(this.id)
      .subscribe(
        (res: any) => {
          this.form = this.formBuilder.group({
            cnpj: res.cnpj,
            name: res.name,
            phone: res.phone,
            email: res.email,
            address: this.formBuilder.group({
              street: res.address.street,
              number: res.address.number,
              complement: res.address.complement,
              cep: res.address.cep,
              district: res.address.district,
              city: res.address.city,
              state: res.address.state,
            })
          })
        },
        error => console.log(error)
      )
  }

  submit(): void {
    const id: number = Number.parseInt(this.id)

    this.suppliersService.editSupplier(id, {id, ...this.form.getRawValue()})
      .subscribe(
        (res: any) => {
          this.router.navigate(['/suppliers'])
        },
        error => console.log(error)
      )
  }
}
