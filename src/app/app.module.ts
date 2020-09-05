import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './components/modals/user-register/user-register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { BlockUIModule } from 'ng-block-ui';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmActionComponent } from './components/modals/confirm-action/confirm-action.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CheckPasswordComponent } from './components/modals/check-password/check-password.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    HomeComponent, 
    ConfirmActionComponent, CheckPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatTableModule,
    BlockUIModule.forRoot({
      message: 'Carregando...'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    CommonModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents: [
    UserRegisterComponent,
    ConfirmActionComponent,
    CheckPasswordComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
