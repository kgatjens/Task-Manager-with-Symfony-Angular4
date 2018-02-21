import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'generateDate'})
export class GenerateDatePipe implements PipeTransform{
	transform(value):string{
		let date = new Date(value * 1000);

		let day = date.getDate();
		let final_day = day.toString();
		if(day <= 9){
			final_day = '0'+day;
		}

		let month = (date.getMonth()+1);
		let final_month = month.toString();
		if(month <= 9){
			final_month = '0'+month;
		}

		let result = final_day + '/' + final_month + '/' + date.getFullYear();
		return result;
	}
}