import { Administrador } from "./administrador";

export class Evento {
    id?: number;
    'nombreEvento': string;
    'telefono': string;
    'email': string;
    'estado': boolean;
    'hora_inicio': string;
    'hora_fin': string;
    'fecha': Date;    
    'lugar': string;
    'descripcion': string;
    'admin': Administrador;

}
