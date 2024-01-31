import { Graduado } from "./graduado";

export class Capacitacion {
    id?: number;
    'nombre': string;
    'institucion': string;
    'tipo_certificado': string;
    'horas': Number;
    'fecha_inicio': Date;
    'fecha_fin': Date;
    'graduado': Graduado;
}