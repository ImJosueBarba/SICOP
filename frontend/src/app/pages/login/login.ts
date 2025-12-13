
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Password } from 'primeng/password';
import { Message } from 'primeng/message';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputText, Button, Card, Password, Message],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    loading = false;
    errorMessage = '';

    onSubmit() {
        if (this.form.valid) {
            this.loading = true;
            this.errorMessage = '';
            const { username, password } = this.form.value;

            this.authService.login(username!, password!).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (err: any) => {
                    this.loading = false;
                    this.errorMessage = 'Usuario o contraseña incorrectos';
                }
            });
        }
    }
}
