import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../services/users';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent implements OnInit {
  
  private usersService = inject(UsersService);  
  
  usuarios: User[] = []; 
  cargando = true; 
  mensajeError = ''; 

  ngOnInit(): void {
    console.log('Iniciando lista de usuarios');
    this.cargarUsuarios(); 
  }

  cargarUsuarios(): void {
    console.log('Llamando a getUsers...');
    this.cargando = true;
    this.mensajeError = '';
    
    this.usersService.getUsers().subscribe({
      next: (data: User[]) => {
        console.log('Datos recibidos:', data);
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar:', err);
        this.mensajeError = 'Error al cargar usuarios';
        this.cargando = false;
      }
    });
  }
}
