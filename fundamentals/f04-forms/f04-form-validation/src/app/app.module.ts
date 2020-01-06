import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ForbiddenValidatorDirective } from './shared/forbidden-name.directive';
import { UniqueAlterEgoValidatorDirective } from './shared/alter-ego.directive';
import { IdentityRevealedValidatorDirective } from './shared/identity-revealed.directive';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenComponent,
    ForbiddenValidatorDirective,
    UniqueAlterEgoValidatorDirective,
    IdentityRevealedValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
