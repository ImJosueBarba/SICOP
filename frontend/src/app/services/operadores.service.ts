
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Operador {
    id?: number;
    nombre: string;
    apellido: string;
    email?: string;
    telefono?: string;
    activo: boolean;
    fecha_contratacion?: string;
    username: string;
    rol: 'ADMIN' | 'VISUALIZADOR' | 'OPERADOR';
    password?: string; // Only for creation
}

@Injectable({
    providedIn: 'root'
})
export class OperadoresService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/operadores';

    getOperadores(): Observable<Operador[]> {
        return this.http.get<Operador[]>(this.apiUrl);
    }

    getOperador(id: number): Observable<Operador> {
        return this.http.get<Operador>(`${this.apiUrl}/${id}`);
    }

    createOperador(operador: Operador): Observable<Operador> {
        return this.http.post<Operador>(this.apiUrl, operador);
    }

    updateOperador(id: number, operador: Partial<Operador>): Observable<Operador> {
        return this.http.put<Operador>(`${this.apiUrl}/${id}`, operador);
    }

    deleteOperador(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
