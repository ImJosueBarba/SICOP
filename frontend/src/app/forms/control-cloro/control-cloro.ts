import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location, CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-control-cloro',
  imports: [CommonModule, ReactiveFormsModule, InputText, InputNumber, Button, Card, FloatLabel, Textarea, Message],
  templateUrl: './control-cloro.html',
  styleUrl: './control-cloro.css',
})
export class ControlCloro implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private location = inject(Location);
  form!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  private apiUrl = 'http://localhost:8000/api/control-cloro';

  ngOnInit() {
    const now = new Date();
    this.form = this.fb.group({
      fecha_mes: [now.toISOString().split('T')[0], Validators.required],
      documento_soporte: [''],
      proveedor_solicitante: [''],
      codigo: [''],
      especificacion: [''],
      cantidad_entra: [null],
      cantidad_sale: [null],
      cantidad_saldo: [null],
      observaciones: [''],
      operador_id: [1]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.http.post(this.apiUrl, this.form.value).subscribe({
        next: () => {
          this.successMessage = 'Registro guardado exitosamente';
          this.loading = false;
          setTimeout(() => { this.form.reset(); this.ngOnInit(); this.successMessage = ''; }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Error: ' + (error.error?.detail || error.message);
          this.loading = false;
        }
      });
    }
  }

  goBack() { this.location.back(); }
}
