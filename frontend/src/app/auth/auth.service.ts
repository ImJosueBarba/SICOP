
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface User {
    username: string;
    rol: 'ADMIN' | 'VISUALIZADOR' | 'OPERADOR';
    sub: string; // username in sub
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private apiUrl = 'http://localhost:8000/api/auth';
    private tokenKey = 'auth_token';

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        this.loadUserFromToken();
    }

    login(username: string, password: string): Observable<AuthResponse> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return this.http.post<AuthResponse>(`${this.apiUrl}/token`, formData).pipe(
            tap(response => {
                localStorage.setItem(this.tokenKey, response.access_token);
                this.loadUserFromToken();
            })
        );
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    hasRole(allowedRoles: string[]): boolean {
        const user = this.currentUserSubject.value;
        if (!user) return false;
        return allowedRoles.includes(user.rol);
    }

    getUser(): User | null {
        return this.currentUserSubject.value;
    }

    private loadUserFromToken() {
        const token = this.getToken();
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                // We need to fetch the user details to get the role, 
                // OR we can include the role in the JWT payload in the backend.
                // For now, let's fetch /me to get the role or assume we decode it if we add it to token.
                // To keep it simple and secure, let's fetch /me.

                this.http.get<any>(`${this.apiUrl}/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).subscribe({
                    next: (user) => {
                        this.currentUserSubject.next({
                            username: user.username,
                            rol: user.rol,
                            sub: user.username
                        });
                    },
                    error: () => {
                        this.logout();
                    }
                });

            } catch (e) {
                this.logout();
            }
        }
    }
}
