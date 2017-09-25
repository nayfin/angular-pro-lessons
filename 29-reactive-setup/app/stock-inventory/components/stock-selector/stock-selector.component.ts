import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div class="stock-selector" [formGroup]="parent">
      <div formGroupName="selector">
        <select formControlName="product_id">
          <option value=""> Select Stock</option>
          <option *ngFor="let product of products" [value]="product.id">
            {{product.name}}
          </option>
        </select>
        <input 
          formControlName="quantity"
          type="number"
          step="10"
          min="10"
          max="1000">
        <stock-counter></stock-counter>
        <button
          (click)="onAdd()"
          type="button">
          ADD STOCK
        </button>
      </div>
    </div>
  `
})

export class StockSelectorComponent {
  @Input() parent: FormControl;  
  
  @Input() products: Product[];

  @Output() added = new EventEmitter<any>();
  onAdd() {
    this.added.emit(this.parent.get('selector').value)
    this.parent.get('selector').reset({
      product_id: '',
      quantity: 10
    })
  }
}