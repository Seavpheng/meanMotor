import { NgForm } from "@angular/forms";

export class User{
    #_id!: string;
    #fullname!: string;
    #username!: string;
    #password!: string;

    public User(fullname : string, username: string, password: string){
        this.#fullname = fullname;
        this.#username = username;
        this.#password = password;
    }

    get _id():string{ return this.#_id; }
    set _id(id: string) {this.#_id = id; }
    
    get fullname (): string {return this.#fullname; }
    set fullname(fullname : string){this.#fullname = fullname; }

    get username():string { return this.#username; }
    set username(usernam : string){ this.#username = usernam; }

    get password():string {return this.#password; }
    set password(password : string){ this.#password = password;}

    reset () :void{
        this.username ="";
        this.password=""; 
    }

    toJSON(){
        return {
            fullname: this.fullname,
            username: this.username,
            password: this.password
        }
      }
}

export class UserLogin{
    #username!: string;
    #password!: string;

    UserLogin(username : string, password: string){
        this.#username = username;
        this.#password = password;
    }

    // get username():string { return this.#username; }
     set username(username : string){ this.#username = username; }

    // get password():string {return this.#password; }
     set password(password : string){ this.#password = password;}

    getUsername() :string{
        return this.#username;
    }

    getPassword():string{
        return this.#password;
    }

    toJSON() {
        return { 
            username: this.getUsername(),
            password: this.getPassword()
        }
      }
    

    public fillFromNgForm(form : NgForm) : UserLogin {
        const obj : UserLogin = new UserLogin();
        obj.username = form.value.username;
        obj.password = form.value.password;
        
        return obj;
    }
}

export class LoginToken{
    #success :boolean =false;
    #token! : string;

    get success(): boolean{ return this.#success; }
    set success(success :boolean ){this.#success = success; }

    get token():string{ return this.#token;}
    set token(token : string){this.#token =token;} 
}