import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { StocksService } from './stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html'
})
export class StocksComponent implements OnInit {

  constructor(
    private stocksService: StocksService
  ) { }

  public stocks: any[];
  public isAdm: boolean = false;

  ngOnInit(): void {
    const token = window.localStorage.getItem('token') as string;

    if (token != null) {
      this.stocksService.getStocks()
        .subscribe(
          stock => {
            this.stocks = stock;
          },
          error => console.log(error)
        )

      const tokenDecoded: any = jwt_decode(token);

      if (tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
        this.isAdm = true;
    }
  }

}
