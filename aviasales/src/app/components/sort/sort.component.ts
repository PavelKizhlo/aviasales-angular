import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.sass'],
})
export class SortComponent {
  @Output() onSortChange: EventEmitter<'cheapest' | 'fastest'> =
    new EventEmitter<'cheapest' | 'fastest'>();

  sort: 'cheapest' | 'fastest' = 'cheapest';

  changeSort(order: 'cheapest' | 'fastest') {
    if (order !== this.sort) {
      this.sort = order;
      this.onSortChange.emit(this.sort);
    }
  }
}
