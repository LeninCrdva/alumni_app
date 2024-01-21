import { Empresa } from "./empresa";

export class ofertaLaboral {
    id?: number;
    'salario': number;
    'fecha_cierre': Date;
    'fecha_publicacion': Date;
    'cargo': string;
    'experiencia': string;
    'fecha_apertura': Date;
    'area_conocimiento': string;    
    'estado': boolean;
    'empresa': Empresa;

}