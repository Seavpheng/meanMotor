import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ManufacturesComponent } from './manufactures/manufactures.component';
import { RegisterComponent } from './register/register.component'; 
import { ManufactureEditorComponent } from './manufacture-editor/manufacture-editor.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ManufactureComponent } from './manufacture/manufacture.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    ManufacturesComponent,
    RegisterComponent, 
    ManufactureEditorComponent, LoginComponent, ProfileComponent, ManufactureComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path :"", component: HomeComponent},
      {path : "manufactures", component: ManufacturesComponent},
      {path : "manufacture-create" , component : ManufactureEditorComponent},
      {path : "manufacture/:manufactureId", component: ManufactureComponent},
      {path : "register", component: RegisterComponent},
      {path : "profile", component: RegisterComponent},
      {path : "login", component: LoginComponent},
    

    ])
  ],
  providers: [
    {provide : JWT_OPTIONS, useValue : JWT_OPTIONS}, 
    JwtHelperService,
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
