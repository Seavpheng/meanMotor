import { Motorbike } from "./motorbike.model";

export class Manufacture {
    #_id! : string;
    #name! : string;
    #establishedYear!: number;
    #motorbikes! :Motorbike[];

    get _id(){return this.#_id;}
    set _id(_id :string ){ this.#_id = _id;}

    get name(){return this.#name;}
    set name(name :string){ this.#name = name; }

    get establishedYear():number {return this.#establishedYear;}
    set establishedYear (establishedYear : number){ this.#establishedYear=establishedYear; }

    get motorbikes(){return this.#motorbikes;}
    set motorbikes(motorbikes : Motorbike[]){ this.#motorbikes = motorbikes; }
}
