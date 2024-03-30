import { Administrador } from "./administrador";

export class Evento {
    id?: number;
    'nombreEvento': string;
    'telefono': string;
    'email': string;
    'estado': boolean;
    'horaInicio': string;
    'horaFin': string;
    'fecha': Date;    
    'lugar': string;
    'descripcion': string;
    'admin': Administrador;

}
