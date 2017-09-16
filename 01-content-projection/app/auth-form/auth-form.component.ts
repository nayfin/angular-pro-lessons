import { Component, Output, EventEmitter, ContentChildren, ViewChild, QueryList, AfterContentInit, AfterViewInit } from '@angular/core';

// Used for ContentChild / ContentChildren
import { AuthRememberComponent } from './auth-remember.component';
// Used for ViewChild
import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message 
          [style.display]="( showMessage ? 'inherit' : 'none')">
        </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  showMessage: boolean = false;

  @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;
  
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  
  ngAfterViewInit() {
    console.log("afterViewInit | AuthMessageComponent:", this.message);
    
  }

  ngAfterContentInit() {
    console.log("afterContentInit | AuthRememberComponent:", this.remember);
    if ( this.message) {
      this.message.days = 30;
    }
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked)
      })
      
      // this.remember.checked
      //   .subscribe((checked: boolean) => { this.showMessage = checked });
    }
    
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
