import { Observable } from 'rxjs/Observable';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/observable/forkJoin'
import { StockValidators } from './stock-inventory.validators';
import { Product, Item } from '../../models/product.interface';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        
        <stock-branch [parent]="form">
        </stock-branch>

        <stock-selector 
          [parent]="form" 
          [products]="products" 
          (added)="addStock($event)">
        </stock-selector>

        <stock-products 
          [parent]="form" 
          (removed)="removeStock($event)"
          [map]="productMap">
        </stock-products>
        <div class="stock-inventory__price">
          Total: {{total | currency: 'USD': true}} 
        </div>
        <div class="stock-inventory__buttons">
          <button 
            type="submit"
            [disabled]="form.invalid">
            Order Stock
          </button>
        </div>
        <pre> {{form.value | json}} </pre>
      </form>
    </div>
  `
})
export class StockInventoryComponent {

  products: Product[];

  productMap: Map<number, Product>

  total: number;

  form = this.fb.group({
    store: this.fb.group({
      branch: ['', [Validators.required, StockValidators.checkBranch]],
      code: ['', [Validators.required]]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  }, { validator: StockValidators.checkStockExists})

  stockControl = this.form.get('stock') as FormArray;

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {  }

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    Observable
      .forkJoin(cart, products)
      .subscribe(([cart, products]: [Item[], Product[]]) => {
        const myMap = products
          .map<[number, Product]>(product => [product.id, product])
        
        this.productMap = new Map<number, Product>(myMap);
        this.products = products;

        cart.forEach(item => this.addStock(item));
        
        this.calculateTotal(this.stockControl.value);
        this.stockControl
          .valueChanges
          .subscribe(val => this.calculateTotal(val));
      });

  }

  calculateTotal(value: Item[]) {
    const total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price);
    }, 0);
    this.total = total;
  }

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity:  stock.quantity || 10,
    })
  }

  addStock(stock){
    this.stockControl.push(this.createStock(stock));
  }
  
  removeStock({group, index}) {
    this.stockControl.removeAt(index);
  }
  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}