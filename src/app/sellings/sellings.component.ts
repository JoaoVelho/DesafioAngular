import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { SellingsService } from './sellings.service';

@Component({
  selector: 'app-sellings',
  templateUrl: './sellings.component.html'
})
export class SellingsComponent implements OnInit {

  constructor(
    private sellingsService: SellingsService
  ) { }

  public sellings: any[];
  public isAdm: boolean = false;

  ngOnInit(): void {
    const token = window.localStorage.getItem('token') as string;

    if (token != null) {
      this.sellingsService.getSellings()
        .subscribe(
          sell => {
            this.sellings = sell;
          },
          error => console.log(error)
        )

      const tokenDecoded: any = jwt_decode(token);

      if (tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
        this.isAdm = true;
    }
  }

  confirm(id: string): void {
    this.sellingsService.confirmSelling(id)
      .subscribe(
        (res: any) => {
          this.ngOnInit()
        },
        error => console.log(error)
      )
  }
}
