import { Component, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, TemplateRef } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="destroyComponent()">DELETE FORM</button>
    <div>
      <ng-container
      [ngTemplateOutlet]="tmpl">
      
      </ng-container>
      <template #tmpl>
        Nayfin : Grand Rapids, MI
      </template>
    </div>
  `
})
export class AppComponent {


}