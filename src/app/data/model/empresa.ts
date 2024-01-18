import { Ciudad } from "./ciudad";
import { Empresario } from "./empresario";
import { sectorempresarial } from "./sectorEmpresarial";

export class Empresa {
    id?: number;
    'empresario': Empresario;
    'ciudad': Ciudad;
    'sectorempresarial': sectorempresarial;
    'ruc': string;
    'nombre': string;
    'tipoEmpresa': string;
    'razonsocial': string;
    'area': string;
    'ubicacion': string;
    'sitioweb': string;

}
