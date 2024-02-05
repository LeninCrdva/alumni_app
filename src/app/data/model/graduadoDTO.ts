import { Ciudad } from "./ciudad";
import { Usuario } from "./usuario";

export class GraduadoDTO {
    id?: number;
    'usuario': string;
    'ciudad': string;
    'año_graduacion': Date;
    'email_personal': string;
    'estadocivil': string;
    'ruta_pdf': string;
    'url_pdf': string;
}