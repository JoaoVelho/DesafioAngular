import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  form: FormGroup;
  public id: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.productsService.getProductById(this.id)
      .subscribe(
        (res: any) => {
          this.form = this.formBuilder.group({
            name: res.name,
            description: res.description,
            unit: res.unit
          })
        },
        error => console.log(error)
      )
  }

  submit(): void {
    const id: number = Number.parseInt(this.id)

    this.productsService.editProduct(id, {id, ...this.form.getRawValue()})
      .subscribe(
        (res: any) => {
          this.router.navigate(['/products'])
        },
        error => console.log(error)
      )
  }
}
