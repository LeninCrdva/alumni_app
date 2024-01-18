import { Graduado } from "./graduado";

export class Capacitacion {
    id?: number;
    'horas': BigInteger;
    'tipo_certificado': string;
    'fecha_inicio': Date;
    'fecha_fin': Date;
    'institucion': string;    
    'lugar': string;
    'nombre': string;
    'graduado': Graduado;

}