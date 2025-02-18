import { Component, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, TemplateRef } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ng-container
      [ngTemplateOutlet]="tmpl"
      [ngTemplateOutletContext]="ctx">
      
      </ng-container>
      <template #tmpl let-name let-location="location">
        {{name}} : {{location}}
      </template>
    </div>
  `
})
export class AppComponent {

  ctx = {
    $implicit: 'Nayfin',
    location: 'Blue Springs, MI'
  }

}