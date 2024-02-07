import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {
    id?: number;
    'clave': string;
    'nombre_usuario': string;
    'estado': boolean;
    'url_imagen': string;
    'persona': Persona;
    'ruta_imagen': string;
    'rol': Rol;
}

export class UsuarioFixed { 
    id?: number;
    'clave': string;
    'nombreUsuario': string;
    'estado': boolean;
    'url_imagen': string;
    'persona': Persona;
    'ruta_imagen': string;
    'rol': Rol;
}