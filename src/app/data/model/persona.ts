export class Persona {
    id?: number;
    'cedula': string;
    'primer_nombre': string;
    'segundo_nombre': string;
    'fechaNacimiento': Date;
    'telefono': string;
    'apellido_paterno': string;
    'apellido_materno': string;
    'sexo'?: Sexo;
}
export enum Sexo {
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO',
    OTRO = 'OTRO'
  }