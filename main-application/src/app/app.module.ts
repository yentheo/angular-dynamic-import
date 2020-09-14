import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NormalComponent } from './normal.component';
import { InternalAngularElementsComponent } from './internal-angular-elements.component';
import { DataService } from './data.service';

import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    NormalComponent,
    InternalAngularElementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  entryComponents: [InternalAngularElementsComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {

  public constructor(injector: Injector) {
    const element = createCustomElement(InternalAngularElementsComponent, { injector });
    customElements.define('internal-angular-elements-component', element);
    console.log({ module: AppModule });
  }

}
