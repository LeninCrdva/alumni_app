import { Carrera } from "./carrera";

export class Periodo {
    id?: number;
    'nombre': string;
    'estado': boolean;
    'fecha_inicio': Date;
    'fecha_fin': Date;
    'carreras': Carrera[];
}
