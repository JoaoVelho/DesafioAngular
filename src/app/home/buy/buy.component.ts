import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/products/products.service';
import { SellingsService } from 'src/app/sellings/sellings.service';
import { StocksService } from 'src/app/stocks/stocks.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html'
})
export class BuyComponent implements OnInit {
  form: FormGroup;
  public id: string;
  public product: any;
  public stock: any;


  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private stocksService: StocksService,
    private sellingsService: SellingsService,
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
          this.product = res
        },
        error => console.log(error)
      )

    this.stocksService.getStockByProductId(this.id)
      .subscribe(
        (res: any) => {
          this.stock = res
        },
        error => console.log(error)
      )
    
    this.form = this.formBuilder.group({
      quantity: '',
    })
  }

  submit(): void {
    const productId: number = Number.parseInt(this.id)
    const quantity = Number.parseFloat(this.form.getRawValue().quantity)
    const value = Number.parseFloat(this.stock.sellValue)
    const body = {
      sellingItems: [
        {
          productId,
          quantity,
          value
        }
      ]
    }

    this.sellingsService.createSelling(body)
      .subscribe(
        (res: any) => {
          this.router.navigate(['/sellings'])
        },
        error => console.log(error)
      )
  }
}
