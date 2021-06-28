import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  public products: any[];
  public isAdm: boolean = false;

  ngOnInit(): void {
    const token = window.localStorage.getItem('token') as string;

    if (token != null) {
      this.productsService.getProducts()
        .subscribe(
          prod => {
            this.products = prod;
          },
          error => console.log(error)
        )

        const tokenDecoded: any = jwt_decode(token);

        if (tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
          this.isAdm = true;
    }
  }

  delete(id: string): void {
    this.productsService.deleteProduct(id)
      .subscribe(
        (res: any) => {
          this.ngOnInit()
        },
        error => console.log(error)
      )
  }
}
