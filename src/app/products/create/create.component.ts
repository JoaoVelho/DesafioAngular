import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      description: '',
      unit: ''
    })
  }

  submit(): void {
    this.productsService.createProduct(this.form.getRawValue())
      .subscribe(
        (res: any) => {
          this.router.navigate(['/products'])
        },
        error => console.log(error)
      )
  }
}
