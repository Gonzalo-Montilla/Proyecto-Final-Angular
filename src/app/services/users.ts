import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { CreateUserDto } from '../models/create-user-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor() { }

  getUsers(): Observable<User[]> {
    console.log('Cargando usuarios desde:', this.apiUrl);
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  simulateCreateUser(user: CreateUserDto): Observable<any> {
    console.log('Creando usuario:', user);
    return of({ success: true, message: 'Usuario creado exitosamente', user });
  }

  // Métodos en español
  obtenerUsuarios(): Observable<User[]> {
    return this.getUsers();
  }

  obtenerUsuarioPorId(id: number): Observable<User> {
    return this.getUserById(id);
  }

  crearUsuario(usuario: CreateUserDto): Observable<User> {
    return this.createUser(usuario);
  }

  simularCrearUsuario(usuario: CreateUserDto): Observable<any> {
    return this.simulateCreateUser(usuario);
  }
}
