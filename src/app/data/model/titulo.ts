export class Titulo {

    constructor(
        public id: number,
        public nombre_titulo: string,
        public tipo: string,
        public num_registro: string,
        public fecha_emision: Date,
        public fecha_registro: Date,
        public nivel: string,
        public institucion: string,
        public nombrecarrera: string,
        public idgraduado?: number
    ) { }
}