import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  model: any = {};

  ngOnInit(): void {

  }
  constructor(private _snackBar: MatSnackBar) { }

  onSubmit() {
    if (!this.model.email&& !this.model.password) {
      this._snackBar.open('Please fill all the required fields', 'Close', {
        duration: 3000,
      });
      return;
    }else
      console.log('Form sent', this.model);
  }
}
