import { Carrera } from "./carrera";
import { Graduado } from "./graduado";

export class Titulo {
    id?: number;
    'graduado': Graduado;
    'tipo': string;
    'nivel': string;
    'institucion': boolean;
    'nombre_titulo': string;
    'fecha_registro': Date;
    'fecha_emision': Date;    
    'num_registro': string;
    'carrera':Carrera;
}