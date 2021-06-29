import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { PurchasesService } from './purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styles: [
  ]
})
export class PurchasesComponent implements OnInit {

  constructor(
    private purchasesService: PurchasesService
  ) { }

  public purchases: any[];
  public isAdm: boolean = false;

  ngOnInit(): void {
    const token = window.localStorage.getItem('token') as string;

    if (token != null) {
      this.purchasesService.getPurchases()
        .subscribe(
          purch => {
            this.purchases = purch;
          },
          error => console.log(error)
        )

      const tokenDecoded: any = jwt_decode(token);

      if (tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
        this.isAdm = true;
    }
  }
}
