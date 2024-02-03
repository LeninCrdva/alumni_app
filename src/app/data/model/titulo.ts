import { Carrera } from "./carrera";
import { Graduado } from "./graduado";

export class Titulo {
    id?: number;
    'idgraduado': number;
    'tipo': string;
    'nivel': string;
    'institucion': string;
    'nombre_titulo': string;
    'fecha_registro': Date;
    'fecha_emision': Date;    
    'num_registro': string;
    'nombrecarrera': string;
}