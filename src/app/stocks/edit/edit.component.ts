import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditStockComponent implements OnInit {
  form: FormGroup;
  public id: string;

  constructor(
    private formBuilder: FormBuilder,
    private stocksService: StocksService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.stocksService.getStockById(this.id)
      .subscribe(
        (res: any) => {
          this.form = this.formBuilder.group({
            sellValue: res.sellValue
          })
        },
        error => console.log(error)
      )
  }

  submit(): void {
    const id: number = Number.parseInt(this.id)
    let { sellValue } = this.form.getRawValue()
    sellValue = Number.parseFloat(sellValue)

    this.stocksService.editStock(id, {id, sellValue})
      .subscribe(
        (res: any) => {
          this.router.navigate(['/stocks'])
        },
        error => console.log(error)
      )
  }

}
