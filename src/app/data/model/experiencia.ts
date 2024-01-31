import { Empresa } from "./empresa";
import { Graduado } from "./graduado";

export class Experiencia {
    id?: number;
    'graduado': Graduado;
    'cargo': string;
    'duracion': string;
    'institucionNombre': string;
    'actividad': string;
}