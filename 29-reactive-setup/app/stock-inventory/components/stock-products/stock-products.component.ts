import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'stock-products',
  styleUrls: ['stock-products.component.scss'],
  template: `
    <div class="stock-products" [formGroup]="parent" >
    </div>
  `
})

export class StockProductsComponent {

  @Input() parent: FormControl;
}