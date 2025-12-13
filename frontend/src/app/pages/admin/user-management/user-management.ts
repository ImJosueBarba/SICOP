import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UsuariosService, Usuario } from '../../../services/usuarios.service';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

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
        Select,
        PasswordModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialogModule,
        TagModule,
        IconFieldModule,
        InputIconModule,
        CardModule,
        TooltipModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './user-management.html',
    styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
    private usuariosService = inject(UsuariosService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private fb = inject(FormBuilder);

    usuarios: Usuario[] = [];
    usuarioDialog: boolean = false;
    form!: FormGroup;
    submitted: boolean = false;
    isEditMode: boolean = false;
    loading: boolean = false;

    roles = [
        { label: 'Administrador', value: 'ADMINISTRADOR' },
        { label: 'Operador', value: 'OPERADOR' }
    ];

    ngOnInit() {
        this.initForm();
        this.loadUsuarios();
    }

    initForm() {
        this.form = this.fb.group({
            id: [null],
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            apellido: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.email]],
            telefono: [''],
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: [''],
            rol: ['OPERADOR', Validators.required],
            activo: [true],
            fecha_contratacion: ['']
        });
    }

    loadUsuarios() {
        this.loading = true;
        this.usuariosService.getUsuarios().subscribe({
            next: (data) => {
                this.usuarios = data;
                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar usuarios'
                });
                this.loading = false;
            }
        });
    }

    openNew() {
        this.form.reset({
            rol: 'OPERADOR',
            activo: true
        });
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.form.get('password')?.updateValueAndValidity();
        this.submitted = false;
        this.isEditMode = false;
        this.usuarioDialog = true;
    }

    editUsuario(usuario: Usuario) {
        this.form.patchValue({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            username: usuario.username,
            rol: usuario.rol,
            activo: usuario.activo,
            fecha_contratacion: usuario.fecha_contratacion
        });
        this.form.get('password')?.clearValidators();
        this.form.get('password')?.updateValueAndValidity();
        this.submitted = false;
        this.isEditMode = true;
        this.usuarioDialog = true;
    }

    deleteUsuario(usuario: Usuario) {
        this.confirmationService.confirm({
            message: `¿Está seguro de desactivar al usuario ${usuario.nombre_completo}?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => {
                this.usuariosService.deleteUsuario(usuario.id!).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Usuario desactivado correctamente'
                        });
                        this.loadUsuarios();
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: error.error?.detail || 'Error al desactivar usuario'
                        });
                    }
                });
            }
        });
    }

    activarUsuario(usuario: Usuario) {
        this.confirmationService.confirm({
            message: `¿Está seguro de activar al usuario ${usuario.nombre_completo}?`,
            header: 'Confirmar',
            icon: 'pi pi-question-circle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => {
                this.usuariosService.activarUsuario(usuario.id!).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Usuario activado correctamente'
                        });
                        this.loadUsuarios();
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al activar usuario'
                        });
                    }
                });
            }
        });
    }

    hideDialog() {
        this.usuarioDialog = false;
        this.submitted = false;
    }

    saveUsuario() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        const usuario = this.form.value;

        if (this.isEditMode) {
            // Modo edición
            const updateData: any = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
                rol: usuario.rol,
                activo: usuario.activo,
                fecha_contratacion: usuario.fecha_contratacion
            };

            // Solo incluir password si se proporcionó uno nuevo
            if (usuario.password && usuario.password.trim() !== '') {
                updateData.password = usuario.password;
            }

            this.usuariosService.updateUsuario(usuario.id, updateData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario actualizado correctamente'
                    });
                    this.loadUsuarios();
                    this.hideDialog();
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error?.detail || 'Error al actualizar usuario'
                    });
                }
            });
        } else {
            // Modo creación
            delete usuario.id;
            this.usuariosService.createUsuario(usuario).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario creado correctamente'
                    });
                    this.loadUsuarios();
                    this.hideDialog();
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error?.detail || 'Error al crear usuario'
                    });
                }
            });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getRolSeverity(rol: string): 'success' | 'info' | 'warn' | 'danger' {
        switch (rol) {
            case 'ADMINISTRADOR':
                return 'danger';
            case 'OPERADOR':
                return 'info';
            default:
                return 'info';
        }
    }

    getEstadoSeverity(activo: boolean): 'success' | 'danger' {
        return activo ? 'success' : 'danger';
    }
}
