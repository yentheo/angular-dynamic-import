import { Component, NgModule, DoBootstrap, ApplicationRef, Compiler, Injector, PlatformRef, getPlatform, Inject, Type, forwardRef, inject, CompilerFactory, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowser, BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createCustomElement } from '@angular/elements';
import { Observable } from 'rxjs';

let dataServiceToken: Type<any>;

@Component({
    selector: 'external-angular-elements-component',
    template: `
        External Angular Elements Component ({{ data$ | async }}) <button (click)="upValue()">{{ value }}</button>    
    `
})
export class ExternalAngularElementsComponent {
    public value = 0;

    public data$: Observable<number>;

    public constructor(@Inject(forwardRef(() => Injector)) injector: Injector, @Inject(forwardRef(() => ChangeDetectorRef)) changeDetectorRef: ChangeDetectorRef) {
        this.data$ = injector.get(dataServiceToken).data$;
        this.data$.subscribe(x => {
            changeDetectorRef.detectChanges();
            console.log(x);
        });
    }

    public upValue() {
        this.value += 1;
    }
}

@NgModule({
    declarations: [ExternalAngularElementsComponent],
    imports: [CommonModule, BrowserModule],
    exports: [ExternalAngularElementsComponent],
    entryComponents: [ExternalAngularElementsComponent]
})
export class ExternalModule { }

export async function activate(injector: Injector, _dataServiceToken: Type<any>) {
    dataServiceToken = _dataServiceToken;
    console.log(dataServiceToken);
    @NgModule({
        imports: [BrowserModule, CommonModule, ExternalModule],
        providers: [{ provide: _dataServiceToken, useFactory: () => injector.get(_dataServiceToken) }]
    }) class ExtensionModule implements DoBootstrap {
        async ngDoBootstrap(_: ApplicationRef) { }
    }

    try {
        const moduleRef = await platformBrowserDynamic().bootstrapModule(ExtensionModule);

        const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(ExternalAngularElementsComponent);
        const el = createCustomElement(ExternalAngularElementsComponent, { injector: moduleRef.injector });
        customElements.define(componentFactory.selector, el);

        return moduleRef;
    } catch (e) {
        console.error(e);
    }
}