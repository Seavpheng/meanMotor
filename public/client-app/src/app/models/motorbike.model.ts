export class Motorbike{
    #_id! : string;
    #modelName! : string;
    #year!: number;
    #horsePower! : string;

    get _id(){
        return this.#_id;
    }

    set _id(id :string){
        this.#_id = id;
    }

    get modelName(){
        return this.#modelName;
    }

    set modelName(modelName: string){
        this.#modelName= modelName;
    }

    get year(){
        return this.#year;
    }

    set year(year : number){
        this.#year = year;
    }

    get horsePower(){
        return this.#horsePower;
    } 

    set horsePower(horsePower : string){
        this.#horsePower = horsePower;
    }
}