import { Component, EventEmitter, Output } from '@angular/core';

export interface CheckBox {
  name: string;
  label: string;
  checked: boolean;
  stops?: number;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass'],
})
export class FilterComponent {
  @Output() onFilterChange: EventEmitter<number[]> = new EventEmitter<
    number[]
  >();

  checkBoxes: CheckBox[] = [
    { name: 'all', label: 'Все', checked: false },
    { name: 'transfer-0', stops: 0, label: 'Без пересадок', checked: false },
    { name: 'transfer-1', stops: 1, label: '1 пересадка', checked: false },
    { name: 'transfer-2', stops: 2, label: '2 пересадки', checked: false },
    { name: 'transfer-3', stops: 3, label: '3 пересадки', checked: false },
  ];

  changeFilters($event: any, box: CheckBox) {
    let stops: number[] = [];

    if (box.name === 'all') {
      this.checkBoxes.slice(1).forEach((box) => {
        box.checked = this.checkBoxes[0].checked;
      });
    } else {
      this.checkBoxes[0].checked = this.checkBoxes
        .slice(1)
        .every((box) => box.checked);
    }

    this.checkBoxes.forEach((box) => {
      if (box.stops !== undefined && box.checked) {
        stops.push(box.stops);
      }
    });

    if (!stops.length) {
      stops = [0, 1, 2, 3];
    }

    this.onFilterChange.emit(stops);
  }
}
