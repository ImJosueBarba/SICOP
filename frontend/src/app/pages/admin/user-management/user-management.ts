
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OperadoresService, Operador } from '../../../services/operadores.service';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        SelectModule,
        PasswordModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './user-management.html',
    styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
    private operadoresService = inject(OperadoresService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private fb = inject(FormBuilder);

    operadores: Operador[] = [];
    operadorDialog: boolean = false;
    form!: FormGroup;
    submitted: boolean = false;
    isEditMode: boolean = false;

    roles = [
        { label: 'Administrador', value: 'ADMIN' },
        { label: 'Visualizador', value: 'VISUALIZADOR' },
        { label: 'Operador', value: 'OPERADOR' }
    ];

    ngOnInit() {
        this.loadOperadores();
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            id: [null],
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.email]],
            rol: ['OPERADOR', Validators.required],
            password: [''], // Required only for create
            telefono: [''],
            activo: [true]
        });
    }

    loadOperadores() {
        this.operadoresService.getOperadores().subscribe(data => {
            this.operadores = data;
        });
    }

    openNew() {
        this.form.reset({ rol: 'OPERADOR', activo: true });
        this.isEditMode = false;
        this.submitted = false;
        this.operadorDialog = true;
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.form.get('password')?.updateValueAndValidity();
    }

    editOperador(operador: Operador) {
        this.form.patchValue(operador);
        this.isEditMode = true;
        this.operadorDialog = true;
        this.form.get('password')?.clearValidators(); // Password optional on edit
        this.form.get('password')?.updateValueAndValidity();
    }

    deleteOperador(operador: Operador) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar a ' + operador.username + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.operadoresService.deleteOperador(operador.id!).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario eliminado', life: 3000 });
                        this.loadOperadores();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario', life: 3000 });
                    }
                });
            }
        });
    }

    hideDialog() {
        this.operadorDialog = false;
        this.submitted = false;
    }

    saveOperador() {
        this.submitted = true;

        if (this.form.valid) {
            const operadorData = this.form.value;

            if (this.isEditMode) {
                // Remove password if empty to avoid overwriting with empty string
                if (!operadorData.password) {
                    delete operadorData.password;
                }

                this.operadoresService.updateOperador(operadorData.id, operadorData).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario actualizado', life: 3000 });
                        this.loadOperadores();
                        this.hideDialog();
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.detail || 'Error al actualizar', life: 3000 });
                    }
                });
            } else {
                this.operadoresService.createOperador(operadorData).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario creado', life: 3000 });
                        this.loadOperadores();
                        this.hideDialog();
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.detail || 'Error al crear', life: 3000 });
                    }
                });
            }
        }
    }
}
