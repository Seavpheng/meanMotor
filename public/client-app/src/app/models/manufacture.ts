import { Motorbike } from "./motorbike";

export class Manufacture {
    #_id! : string;
    #name! : string;
    #establishedYear!: string;
    #motorbikes! :[Motorbike];

    get _id(){return this.#_id;}
    get name(){return this.#name;}
    get establishedYear(){return this.#establishedYear;}
    get motorbikes(){return this.#motorbikes;}
}
