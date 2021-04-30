import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { DateTime }	from 'luxon';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	now:Date;
	wakeTime:Date;

	constructor(private decimalPipe:DecimalPipe) {
		setInterval(() => this.onTick(), 1000);
		this.onTick();
	}

	onTick() {
		this.now = new Date();
		this.wakeTime = DateTime.fromJSDate(this.now).set({hour:6, minute:0, second:0}).toJSDate();
	}

	get secLeft() {
		const duration = DateTime.fromJSDate(this.wakeTime).diff(DateTime.fromJSDate(this.now), 'seconds');
		let secLeft = duration.seconds;
		if(secLeft<-3600*3) secLeft += 24*3600;
		return Math.round(secLeft);
	}

	get greenLight() {
		return this.secLeft<=0;
	}

	get timeLeft() {
		return this.durationText(this.secLeft);

		// return `${this.decimalPipe.transform(duration.hours,'2.0')}:${this.decimalPipe.transform(duration.minutes,'2.0')}:${this.decimalPipe.transform(duration.seconds,'2.0')}`;
	}

	durationText(sec:number):string {
		const h = Math.floor(sec/3600);
		const m = Math.floor(sec/60 % 60);
		const s = this.round(sec % 60, 1);
		return `${this.decimalPipe.transform(h,'2.0')}:${this.decimalPipe.transform(m,'2.0')}:${this.decimalPipe.transform(s,'2.0')}`;
	}

	round(value:number, digits=0):number {
		digits = Math.pow(10,digits);
		return Math.round(value*digits)/digits;
	}

}
