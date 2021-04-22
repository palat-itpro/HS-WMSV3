import {Component} from '@angular/core';
import {AppMainComponent} from '../app.main.component';

@Component({
    templateUrl: './app.invoice.component.html'
})
export class AppInvoiceComponent {

    constructor(public app: AppMainComponent) {
    }

    print() {
        window.print();
    }
}
