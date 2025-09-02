import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users';
import { CreateUserDto } from '../../models/create-user-dto.interface';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class FormularioUsuarioComponent {
  private fb = inject(FormBuilder);
  private servicioUsuarios = inject(UsersService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formularioUsuario: FormGroup;
  enviando = false;

  constructor() {
    // Aquí creo el formulario con validaciones
    this.formularioUsuario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\(\)\+\s]+$/)]],
      website: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.pattern(/^[0-9\-]+$/)]]
      }),
      company: this.fb.group({
        name: ['', Validators.required]
      })
    });
  }

  enviarFormulario(): void {
    if (this.formularioUsuario.valid) {
      this.enviando = true;
      const datosUsuario: CreateUserDto = this.formularioUsuario.value;
      
      console.log('Enviando usuario:', datosUsuario);
      
      this.servicioUsuarios.simularCrearUsuario(datosUsuario).subscribe({
        next: (respuesta: any) => {
          console.log('Usuario creado exitosamente!');
          this.snackBar.open('Usuario creado exitosamente!', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/users']);
        },
        error: (error: any) => {
          console.log('Error al crear usuario:', error);
          this.snackBar.open('Error al crear el usuario', 'Cerrar', {
            duration: 3000
          });
          this.enviando = false;
        }
      });
    } else {
      console.log('Formulario no válido');
      this.marcarCamposTocados();
    }
  }

  cancelar(): void {
    this.router.navigate(['/users']);
  }

  private marcarCamposTocados(): void {
    Object.keys(this.formularioUsuario.controls).forEach(key => {
      const control = this.formularioUsuario.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          control.get(nestedKey)?.markAsTouched();
        });
      }
    });
  }

  obtenerMensajeError(nombreCampo: string): string {
    const control = this.formularioUsuario.get(nombreCampo);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'El email no es válido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength']?.requiredLength} caracteres`;
    }
    if (control?.hasError('pattern')) {
      return 'El formato no es válido';
    }
    return '';
  }

  // Mantengo los nombres originales para compatibilidad
  onSubmit(): void { this.enviarFormulario(); }
  onCancel(): void { this.cancelar(); }
  getErrorMessage(fieldName: string): string { return this.obtenerMensajeError(fieldName); }

  // Propiedades de compatibilidad
  get userForm() { return this.formularioUsuario; }
}

// Para mantener compatibilidad
export class UserFormComponent extends FormularioUsuarioComponent {}
