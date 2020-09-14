import { Component, ElementRef, AfterViewInit, Injector, Compiler, NgModule, DoBootstrap, ApplicationRef, getPlatform, CompilerFactory } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { platformBrowser, BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'main-application';

  public constructor(private host: ElementRef, private injector: Injector, private compiler: Compiler, private dataService: DataService) {
  }

  public async ngAfterViewInit() {
    this.host.nativeElement.appendChild(document.createElement('internal-angular-elements-component'));
    
    const module = await import(/* webpackIgnore: true */ `/assets/external/index.js`);
    console.log(module);
    const compiled = await module.activate(this.injector, DataService);
    console.log(compiled);
    this.host.nativeElement.appendChild(document.createElement('external-angular-elements-component'));
  }

  public nextData() {
    this.dataService.next();
  }
}
