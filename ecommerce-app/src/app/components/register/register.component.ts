import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service'; // Adjust the path as needed
import { User } from '../../models/user.model'; // Ensure this path is correct

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const newUser: User = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(newUser).subscribe(
      response => {
        console.log('Registration successful!', response);
         this.router.navigate(['/']);
      },
      error => {
        console.error('Registration failed.', error);
      }
    );
  }
}
