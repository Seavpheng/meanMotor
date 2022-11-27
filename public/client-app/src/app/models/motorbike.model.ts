import { FormGroup } from "@angular/forms";

export class Motorbike{
    #_id! : string;
    #modelName! : string;
    #year!: number;
    #horsePower! : string;

    get _id():string { return this.#_id; }

    set _id(id :string){ this.#_id = id; }

    get modelName(){ return this.#modelName; }

    set modelName(modelName: string){ this.#modelName= modelName; }

    get year(){ return this.#year; }

    set year(year : number){ this.#year = year; }

    get horsePower(){ return this.#horsePower;  } 

    set horsePower(horsePower : string){ this.#horsePower = horsePower; }

    bindFormGroup(fg: FormGroup){
        this._id = fg.value._id;
        this.modelName = fg.value.modelName;
        this.year = fg.value.year;
        this.horsePower = fg.value.horsePower;
    }

    reset(){
        this.modelName ="";
        this.year;
        this.horsePower="";
    }

    toJSON(){
        return {
            modelName : this.#modelName,
            year : this.year,
            horsePower : this.horsePower 

        }
    }
}