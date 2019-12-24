import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { HighlighterDirective } from './highlighter.directive';
import { HighlightMeDirective } from './highlight-me.directive';
import { HighlightAliasDirective } from './highlight-alias.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    HighlighterDirective,
    HighlightMeDirective,
    HighlightAliasDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
