export class Motorbike{
    #_id! : string;
    #modelName! : string;
    #year!: number;
    #horsePower! : string;

    getId (){
        return this.#_id;
    }

    getModelName(){
        return this.#modelName;
    }

    getYear(){
        return this.#year;
    }

    getHorsePower(){
        return this.#horsePower;
    }

}