import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'stock-branch',
  styleUrls: ['stock-branch.component.scss'],
  template: `
    <div [formGroup]="parent">
      <div formGroupName="store">
        <input type="text" placeholder="Branch ID" formControlName="branch">
        <input type="text" placeholder="Manager Code" formControlName="code">
      </div>
    </div>
  `
})

export class StockBranchComponent {

  @Input() parent: FormControl;
}
