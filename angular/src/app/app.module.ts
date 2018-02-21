import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';


import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DefaultComponent } from './components/default.component';
import { UserEditComponent } from './components/user.edit.component';
import { TaskNewComponent } from './components/task.new.component';
import { TaskDetailComponent } from './components/task.detail.component';
import { TaskEditComponent } from './components/task.edit.component';

//Pipe
import { GenerateDatePipe } from './pipes/generate.date.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    UserEditComponent,
    TaskNewComponent,
    TaskDetailComponent,
    TaskEditComponent,
    GenerateDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
