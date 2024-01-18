import { Ciudad } from "./ciudad";
import { Usuario } from "./usuario";

export class Graduado {
    id?: number;
    'nombre': string;
    'usuario': Usuario;
    'ciudad': Ciudad;
    'fecha_graduacion': Date;
    'emailPersonal': string;
    'estadocivil': string;
    'ruta_pdf': string;
    'url_pdf': string;

}
