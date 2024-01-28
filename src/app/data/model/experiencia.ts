import { Empresa } from "./empresa";
import { Graduado } from "./graduado";

export class Experiencia {
    id?: number;
    'salario': number;
    'telefono': string;
    'fecha_cierre': Date;
    'fecha_publicacion': Date;
    'cargo': string;
    'experiencia': string;
    'fecha_apertura': Date;
    'area_conocimiento': string;
    'estado': boolean;
    'empresa': Empresa;
    'graduado': Graduado;
}