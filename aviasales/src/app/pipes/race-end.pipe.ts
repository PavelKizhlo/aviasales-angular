import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'raceEnd',
})
export class RaceEndPipe implements PipeTransform {
  transform(raceStart: string, duration: number): Date {
    const ms = duration * 60 * 1000;
    const raceStartDate = new Date(raceStart);
    return new Date(raceStartDate.getTime() + ms);
  }
}
