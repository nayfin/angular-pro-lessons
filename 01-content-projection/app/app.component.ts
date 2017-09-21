import { Component, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, TemplateRef } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="destroyComponent()">DELETE FORM</button>
    <div>
      <ng-container>
      
      </ng-container>
      <template #tmpl let-name let-location="location">
        {{name}} : {{ location }}
      </template>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  rememberMe: boolean = false;

  component: ComponentRef<AuthFormComponent>

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;
  constructor( 
    private resolver: ComponentFactoryResolver
  ) { }

  ngAfterContentInit() {
    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Bill Murry',
      location: 'England, UK'
    })
  }
  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }

  destroyComponent() {
    this.component.destroy()
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

}