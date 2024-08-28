import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearOfProduction',
  standalone: true,
})
export class YearOfProductionPipe implements PipeTransform {
  transform(yearOfProduction: string): string {
    if (yearOfProduction.endsWith('–')) return `${yearOfProduction}now`;
    return yearOfProduction;
  }
}
