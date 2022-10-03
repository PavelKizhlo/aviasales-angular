import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logo',
})
export class LogoPipe implements PipeTransform {
  transform(value: string): string {
    return `https://pics.avs.io/99/36/${value}.png`;
  }
}
