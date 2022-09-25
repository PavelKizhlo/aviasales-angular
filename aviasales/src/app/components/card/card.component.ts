import { Component, Input } from '@angular/core';
import { Ticket } from '../../services/tickets.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input() ticket: Ticket;
}
