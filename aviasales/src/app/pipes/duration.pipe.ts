import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value - hours * 60;
    return `${hours}ч ${minutes}м`;
  }
}
