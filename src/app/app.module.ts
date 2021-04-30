import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	providers: [DecimalPipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
