import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {Role} from '../interfaces/role';
import {RoleService} from '../services/role.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatIconButton,
    MatIcon,
    MatButton,
    MatError,
    MatLabel,
    MatSuffix
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;
  hidePassword = true;
  roles: Role[] = new Array<Role>();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private roleService: RoleService,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const {email, password} = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        const roleName = this.authService.getRoleName();

        if (roleName === 'CTO' || roleName === 'Tech-Lead') {
          this.router.navigate(['/admin']);
        } else if (roleName === 'Mitarbeiter') {
          this.router.navigate(['/viewer']);
        } else {
          this.loginError = 'Unknown role. Access denied.';
        }
      },
      error: () => {
        this.loginError = 'Login failed. Please check your access data.';
      }
    });
  }
}
