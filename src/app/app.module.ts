import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EquationComponent } from './equation/equation.component';
import { AnswerHighlightDirectiveDirective } from './answer-highlight-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    EquationComponent,
    AnswerHighlightDirectiveDirective,
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
