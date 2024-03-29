export class ofertaLaboralDTO {
    id?: number;
    'salario': number;
    'fechaCierre': Date;
    'fechaPublicacion': Date;
    'cargo': string;
    'experiencia': string;
    'fechaApertura': Date;
    'areaConocimiento': string;    
    'estado': boolean;
    'nombreEmpresa': string;
    'correoGraduado': string[];
    'tipo'?: string;
    'tiempo'?: string;
    'foto_portada'?: string;
}