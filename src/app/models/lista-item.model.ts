export class ListaItem {
    desc: string;
    completado: boolean;

    constructor(desc: string) {
        this.completado = false;
        this.desc = desc;
    }
}
