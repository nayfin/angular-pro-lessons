import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'stock-branch',
  styleUrls: ['stock-branch.component.scss'],
  template: `
    <div [formGroup]="parent">
      <div formGroupName="store">
        <input 
          type="text" 
          placeholder="Branch ID" 
          formControlName="branch">
          <div class="error" *ngIf="required('branch')">
            Branch Id is required
          </div> 
          <div class="error" *ngIf="invalidbranchPattern">
            Branch Id does not match pattern
          </div>  
        <input 
          type="text" 
          placeholder="Manager Code" 
          formControlName="code">
          <div class="error" *ngIf="required('code')">
          Manager code is required
          </div>
      </div>
    </div>
  `
})

export class StockBranchComponent {

  @Input() parent: FormControl;
  
  get invalidbranchPattern() {
    return (
      this.parent.get('store.branch').hasError('invalidBranch') &&
      this.parent.get('store.branch').dirty &&
      !this.required('branch')
    );
  }

  required(controlName: string) {
    return (
      this.parent.get(`store.${controlName}`).hasError('required') &&
      this.parent.get(`store.${controlName}`).touched
    );
  }
}
