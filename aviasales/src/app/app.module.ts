import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { SortComponent } from './components/sort/sort.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RetryInterceptor } from './retry.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from './pipes/duration.pipe';
import { TransferPipe } from './pipes/transfer.pipe';
import { RaceEndPipe } from './pipes/race-end.pipe';
import { LogoPipe } from './pipes/logo.pipe';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RetryInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    SortComponent,
    ButtonComponent,
    CardComponent,
    SpinnerComponent,
    DurationPipe,
    TransferPipe,
    RaceEndPipe,
    LogoPipe,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
