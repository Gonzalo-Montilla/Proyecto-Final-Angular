// Interfaz para crear usuarios nuevos
export interface NuevoUsuario {
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}


export interface CreateUserDto extends NuevoUsuario {}
