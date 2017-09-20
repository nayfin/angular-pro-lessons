import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

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
        <h3>{{title}}</h3>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <button type="submit">
          {{ title }}
        </button>
      </form>
    </div>
  `
})
export class AuthFormComponent {

  showMessage: boolean = false;
  title = 'Login'
  @ViewChild('email') email: ElementRef;
 
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
