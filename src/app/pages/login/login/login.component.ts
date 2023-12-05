import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _snackBar: MatSnackBar, 
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private cookie:CookieService,
    ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    if (this.form.valid) {
      const login = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      try {
        this.auth.login(login).subscribe(
          (response:any) => {
            //const tokenCookie = this.cookie.get('jwt');
            //console.log('token',tokenCookie)
            //console.log('Server Response: ', response);
           //this.cookie.set('jwt', response.token);
            localStorage.setItem('jwt',response.token)
            try {
              const decodedToken: token = jwtDecode(response.token);
              const role = decodedToken.role;
              
              /*console.log(decodedToken);
              console.log(this.cookie.get('jwt'))
              console.log(role);*/

              if (role == 'admin') {
                this._snackBar.open('Welcome', 'Close', {
                  duration: 3000,
                });
                this.router.navigate(['/private']);
              } else {
                this._snackBar.open('Welcome', 'Close', {
                  duration: 3000,
                });
                this.router.navigate(['/home']);
              }
            } catch (error) {
              console.error('Error decoding token:', error);
              // Trata el error de decodificación del token aquí
            }
          },
          (error) => {
            this._snackBar.open('incorrect username or password', 'Close', {
              duration: 3000,
            });
          }
        );
      } catch (error) {
        this._snackBar.open('internal error', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this._snackBar.open('Please fill all the required fields', 'Close', {
        duration: 3000,
      });
    }
  }
  
  

  Onforgot(){
    this.router.navigate(['/forgot-password'])
  }
}
