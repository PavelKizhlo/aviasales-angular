import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, expand, lastValueFrom, Observable } from 'rxjs';

export interface SearchId {
  [searchId: string]: string;
}

export interface Ticket {
  price: number;
  carrier: string;
  segments: [
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    }
  ];
}

export interface Response {
  stop: boolean;
  tickets: Ticket[];
}

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private http: HttpClient) {}

  getSearchId(): Promise<SearchId> {
    const searchId$ = this.http.get<SearchId>(
      'https://front-test.dev.aviasales.ru/search'
    );
    return lastValueFrom(searchId$);
  }

  async fetchTickets(): Promise<Observable<Response>> {
    const searchId = await this.getSearchId();

    return this.http
      .get<Response>('https://front-test.dev.aviasales.ru/tickets', {
        params: searchId,
      })
      .pipe(
        expand((response) =>
          response.stop
            ? EMPTY
            : this.http.get<Response>(
                'https://front-test.dev.aviasales.ru/tickets',
                {
                  params: searchId,
                }
              )
        )
      );
  }
}
