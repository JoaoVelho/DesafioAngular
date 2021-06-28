import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  public products: any[];

  ngOnInit(): void {
    if (window.localStorage.getItem('token') != null) {
      this.productsService.getProducts()
        .subscribe(
          prod => {
            this.products = prod;
            console.log(prod)
          },
          error => console.log(error)
        )
    }
  }

}
