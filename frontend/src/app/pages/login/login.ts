
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, InputText],
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
    rememberMe = false;

    async onSubmit() {
        if (this.form.valid) {
            this.loading = true;
            this.errorMessage = '';
            const { username, password } = this.form.value;

            try {
                await this.authService.login(username!, password!);
                this.loading = false;
                this.router.navigate(['/']);
            } catch (err: any) {
                this.loading = false;
                this.errorMessage = 'Usuario o contraseña incorrectos';
            }
        }
    }
}
