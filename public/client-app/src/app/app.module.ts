import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { MotorbikeEditorComponent } from './motorbike-editor/motorbike-editor.component';
import { environment } from './../environments/environment'; 
import { AppInterceptor } from './app.interceptor';
import { AuthenticationService } from './services/authentication.service';
 

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    ManufacturesComponent,
    RegisterComponent, 
    ManufactureEditorComponent, LoginComponent, ProfileComponent, ManufactureComponent, MotorbikeEditorComponent,
  
 

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path :"", component: HomeComponent},
      {path : environment.listManufacture, component: ManufacturesComponent},
      {path : environment.createManufacture , component : ManufactureEditorComponent},
      {path : environment.editManufacture , component : ManufactureEditorComponent},
      {path : environment.getManufacture, component: ManufactureComponent},
      {path : environment.userRegister, component: RegisterComponent},
      {path : environment.userProfile, component: ProfileComponent},
      {path : environment.userLogin, component: LoginComponent},
    

    ])
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    {
      provide :  JWT_OPTIONS, 
      useValue : JWT_OPTIONS
    }, 
    JwtHelperService,

 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
