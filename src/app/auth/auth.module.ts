import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent],
})
export class AuthModule {}
