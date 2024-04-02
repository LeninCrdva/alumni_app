import { Empresa } from "./empresa";

export class ofertaLaboral {
    id?: number;
    'salario': number;
    'fechaCierre': Date;
    'fechaPublicacion': Date;
    'cargo': string;
    'experiencia': string;
    'fechaApertura': Date;
    'areaConocimiento': string;    
    'estado': boolean;
    'empresa': Empresa;
    'tipo': string;
    'foto_portada': string;
    'tiempo'?: string;
}