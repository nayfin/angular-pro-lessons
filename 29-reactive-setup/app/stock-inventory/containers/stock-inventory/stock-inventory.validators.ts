import { AbstractControl, FormGroup } from '@angular/forms';

export class StockValidators {

  static checkBranch(control: AbstractControl) {
    const regexp = /^[a-z]\d{3}$/i;
    const valid = regexp.test(control.value);
    return valid ? null : { invalidBranch: true}
  }

  static checkStockExists(control: AbstractControl) {
    const stockItems = control.get('stock');
    const selectedStock = control.get('selector');
    
    if(!(stockItems && selectedStock)){
      return null;
    }
    
    const exists = stockItems.value.some((stock) => stock.product_id === parseInt(selectedStock.value.product_id));
    
    return exists ? { stockExists: true } : null;
  }

}