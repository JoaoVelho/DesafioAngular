import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { SuppliersService } from './suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styles: [
  ]
})
export class SuppliersComponent implements OnInit {

  constructor(
    private suppliersService: SuppliersService
  ) { }

  public suppliers: any[];
  public isAdm: boolean = false;

  ngOnInit(): void {
    const token = window.localStorage.getItem('token') as string;

    if (token != null) {
      this.suppliersService.getSuppliers()
        .subscribe(
          sup => {
            this.suppliers = sup;
          },
          error => console.log(error)
        )

      const tokenDecoded: any = jwt_decode(token);

      if (tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
        this.isAdm = true;
    }
  }

  delete(id: string): void {
    this.suppliersService.deleteSupplier(id)
      .subscribe(
        (res: any) => {
          this.ngOnInit()
        },
        error => console.log(error)
      )
  }
}
