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
        <stock-counter
          [step]="7"
          formControlName="quantity">
        </stock-counter>
        <button
          [disabled]="stockExists || notSelected"
          (click)="onAdd()"
          type="button">
          ADD STOCK
        </button>
        <div
          class="stock-selector__error"
          *ngIf="stockExists">
          Item already exists in the stock
        </div>
      </div>
    </div>
  `
})

export class StockSelectorComponent {
  @Input() parent: FormControl;  
  
  @Input() products: Product[];

  @Output() added = new EventEmitter<any>();

  get notSelected() {
    return !this.parent.get('selector.product_id').value;
  }
  get stockExists()  {
    return (
      this.parent.hasError('stockExists') &&
      this.parent.get('selector.product_id').dirty
    );
  }
  onAdd() {
    this.added.emit(this.parent.get('selector').value)
    this.parent.get('selector').reset({
      product_id: '',
      quantity: 10
    })
  }
}