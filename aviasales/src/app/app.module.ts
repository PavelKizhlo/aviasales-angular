import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { SortComponent } from './components/sort/sort.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RetryInterceptor } from './retry.interceptor';

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
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
