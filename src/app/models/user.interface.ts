export interface Direccion {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Empresa {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Direccion;
  phone: string;
  website: string;
  company: Empresa;
}


export interface User extends Usuario {}
