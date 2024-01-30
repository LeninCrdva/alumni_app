import { Empresa } from "./empresa";
import { Graduado } from "./graduado";

export class ofertaLaboral {
    id?: number;
    'salario': number;
    'fechaCierre': Date;
    'fechaPublicacion': Date;
    'cargo': string;
    'experiencia': string;
    'fecha_apertura': Date;
    'area_conocimiento': string;    
    'estado': boolean;
    'empresa': Empresa;
    'graduados': Graduado[];

}