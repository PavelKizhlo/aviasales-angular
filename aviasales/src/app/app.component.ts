import { Component, OnInit } from '@angular/core';
import { Ticket, TicketsService } from './services/tickets.service';

export interface TicketsParams {
  sort: 'cheapest' | 'fastest';
  amount: number;
  filters: number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  isCompleted = false;

  tickets: Ticket[] = [];

  filteredTickets: Ticket[] = [];

  shownTickets: Ticket[];

  ticketsParams: TicketsParams = {
    sort: 'cheapest',
    amount: 5,
    filters: [0, 1, 2, 3],
  };

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.fetchTickets().then((observer) => {
      observer.subscribe((ticketPack) => {
        this.tickets.push(...ticketPack.tickets);
        this.isCompleted = ticketPack.stop;
        this.getShownTickets();
      });
    });
  }

  filterTickets() {
    this.filteredTickets = this.tickets.filter((ticket) => {
      return (
        this.ticketsParams.filters.includes(ticket.segments[0].stops.length) &&
        this.ticketsParams.filters.includes(ticket.segments[1].stops.length)
      );
    });
  }

  sortTickets() {
    switch (this.ticketsParams.sort) {
      case 'fastest':
        this.filteredTickets.sort((a, b) => {
          const durationA = a.segments[0].duration + a.segments[1].duration;
          const durationB = b.segments[0].duration + b.segments[1].duration;
          return durationA - durationB;
        });
        break;
      case 'cheapest':
      default:
        this.filteredTickets.sort((a, b) => {
          return a.price - b.price;
        });
        break;
    }
  }

  getShownTickets() {
    this.filterTickets();
    this.sortTickets();
    this.shownTickets = this.filteredTickets.slice(
      0,
      this.ticketsParams.amount
    );
  }
}
