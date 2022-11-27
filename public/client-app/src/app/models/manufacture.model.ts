import { FormGroup } from "@angular/forms";
import { Motorbike } from "./motorbike.model";

export class Manufacture {
    #_id! : string;
    #name! : string;
    #shortDescription!: string;
    #establishedYear!: number;
    #motorbikes! :Motorbike[];

    Manufacture(id:string, name :string, establishedYear :number){
        this._id = id;
        this.name = name;
        this.establishedYear = establishedYear; 
    }

    get _id(){return this.#_id;}
    set _id(_id :string ){ this.#_id = _id;}

    get name(){return this.#name;}
    set name(name :string){ this.#name = name; }

    get shortDescription(){return this.#shortDescription;}
    set shortDescription(shortDescription :string){ this.#shortDescription = shortDescription; }

    get establishedYear():number {return this.#establishedYear;}
    set establishedYear (establishedYear : number){ this.#establishedYear=establishedYear; }

    get motorbikes(){return this.#motorbikes;}
    set motorbikes(motorbikes : Motorbike[]){ this.#motorbikes = motorbikes; }

    public toJSON(){
        return {
            _id : this.#_id,
            name : this.name,
            shortDescription : this.shortDescription,
            establishedYear : this.establishedYear
        }
    }

    public bindFormGroup(fg: FormGroup){
        this._id = fg.value._id;
        this.name = fg.value.name;
        this.shortDescription = fg.value.shortDescription;
        this.establishedYear = fg.value.establishedYear; 
    }
}

export class ManufacturePagination{
    status! : number;
    message! : Manufacture[];
    numPages!: number;


}
